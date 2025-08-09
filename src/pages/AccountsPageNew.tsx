import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    Button,
    Input,
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogContent,
    DialogBody,
    DialogActions,
    Field,
    DataGrid,
    DataGridHeader,
    DataGridHeaderCell,
    DataGridBody,
    DataGridRow,
    DataGridCell,
    createTableColumn,
    type TableColumnDefinition,
    MenuButton,
    Menu,
    MenuList,
    MenuItem,
    MessageBar,
    MessageBarBody,
    Spinner,
    SearchBox,
    Text,
    makeStyles,
    tokens,
    Title1,
} from '@fluentui/react-components';
import {
    AddRegular,
    EditRegular,
    DeleteRegular,
    MoreHorizontalRegular,
    SearchRegular,
    ArrowClockwiseRegular,
} from '@fluentui/react-icons';
import { accountsService } from '../Services/accountsService';
import type { accounts } from '../Models/accountsModel';
import { usePowerRuntime } from '../hooks/usePowerRuntime';
import BasePage from '../components/common/BasePage';

const useStyles = makeStyles({
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    titleRow: {
        marginBottom: '8px',
    },
    toolbarRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: tokens.spacingHorizontalM,
    },
    searchContainer: {
        display: 'flex',
        gap: tokens.spacingHorizontalM,
        alignItems: 'center',
    },
    searchBox: {
        width: '400px',
    },
    fullWidthContainer: {
        // Expand to match the header content width exactly
        width: 'calc(100% + 48px)', // Account for the 24px padding on each side
        marginLeft: '-24px',
        marginRight: '-24px',
        paddingLeft: '24px',
        paddingRight: '24px',
        boxSizing: 'border-box',
    },
    gridContainer: {
        border: `1px solid ${tokens.colorNeutralStroke2}`,
        borderRadius: tokens.borderRadiusMedium,
        overflow: 'hidden',
    },
    actionButton: {
        minWidth: 'auto',
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
    },
    emptyState: {
        textAlign: 'center',
        padding: tokens.spacingVerticalXXL,
        color: tokens.colorNeutralForeground3,
    },
});

interface AccountFormData {
    name: string;
    accountnumber?: string;
    emailaddress1?: string;
    address1_telephone1?: string;
    websiteurl?: string;
}

const emptyAccount: AccountFormData = {
    name: '',
    accountnumber: '',
    emailaddress1: '',
    address1_telephone1: '',
    websiteurl: '',
};

export const AccountsPage: React.FC = () => {
    const styles = useStyles();
    const { isReady } = usePowerRuntime();
    const [accounts, setAccounts] = useState<accounts[]>([]);
    const [filteredAccounts, setFilteredAccounts] = useState<accounts[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Form state
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [formData, setFormData] = useState<AccountFormData>(emptyAccount);
    const [editingAccountId, setEditingAccountId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load accounts
    const loadAccounts = useCallback(async () => {
        if (!isReady) return;

        setLoading(true);
        setError(null);

        try {
            const result = await accountsService.getAll({
                orderBy: ['name'],
                top: 100
            });
            if (result?.success) {
                const accountsList = (result.data as accounts[]) || [];
                setAccounts(accountsList);
                setFilteredAccounts(accountsList);
            } else {
                setError('Failed to load accounts');
                setAccounts([]);
                setFilteredAccounts([]);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load accounts');
            setAccounts([]);
            setFilteredAccounts([]);
        } finally {
            setLoading(false);
        }
    }, [isReady]);

    // Search filtering
    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredAccounts(accounts);
        } else {
            const filtered = accounts.filter(account =>
                account.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                account.emailaddress1?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                account.address1_telephone1?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                account.websiteurl?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                account.accountnumber?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredAccounts(filtered);
        }
    }, [accounts, searchTerm]);

    // Load accounts when ready
    useEffect(() => {
        loadAccounts();
    }, [loadAccounts]);

    // Form handlers
    const handleInputChange = (field: keyof AccountFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCreate = () => {
        setFormData(emptyAccount);
        setIsCreateDialogOpen(true);
    };

    const handleEdit = useCallback((account: accounts) => {
        setFormData({
            name: account.name || '',
            accountnumber: account.accountnumber || '',
            emailaddress1: account.emailaddress1 || '',
            address1_telephone1: account.address1_telephone1 || '',
            websiteurl: account.websiteurl || '',
        });
        setEditingAccountId(account.accountid || '');
        setIsEditDialogOpen(true);
    }, []);

    const handleDelete = useCallback(async (accountId: string) => {
        if (!window.confirm('Are you sure you want to delete this account?')) {
            return;
        }

        try {
            await accountsService.delete(accountId);
            setSuccess('Account deleted successfully');
            loadAccounts();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete account');
        }
    }, [loadAccounts]);

    const handleSubmitCreate = async () => {
        if (!formData.name.trim()) {
            setError('Account name is required');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const result = await accountsService.create(formData as Omit<accounts, 'accountid'>);
            if (result?.success) {
                setSuccess('Account created successfully');
                setIsCreateDialogOpen(false);
                setFormData(emptyAccount);
                loadAccounts();
            } else {
                setError('Failed to create account');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create account');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitEdit = async () => {
        if (!formData.name.trim() || !editingAccountId) {
            setError('Account name is required');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const result = await accountsService.update(editingAccountId, formData);
            if (result?.success) {
                setSuccess('Account updated successfully');
                setIsEditDialogOpen(false);
                setFormData(emptyAccount);
                setEditingAccountId(null);
                loadAccounts();
            } else {
                setError('Failed to update account');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update account');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Column definitions
    const columns: TableColumnDefinition<accounts>[] = useMemo(() => [
        createTableColumn<accounts>({
            columnId: 'name',
            compare: (a, b) => (a.name || '').localeCompare(b.name || ''),
            renderHeaderCell: () => 'Name',
            renderCell: (account) => account.name || '-',
        }),
        createTableColumn<accounts>({
            columnId: 'accountnumber',
            compare: (a, b) => (a.accountnumber || '').localeCompare(b.accountnumber || ''),
            renderHeaderCell: () => 'Account Number',
            renderCell: (account) => account.accountnumber || '-',
        }),
        createTableColumn<accounts>({
            columnId: 'email',
            compare: (a, b) => (a.emailaddress1 || '').localeCompare(b.emailaddress1 || ''),
            renderHeaderCell: () => 'Email',
            renderCell: (account) => account.emailaddress1 || '-',
        }),
        createTableColumn<accounts>({
            columnId: 'phone',
            compare: (a, b) => (a.address1_telephone1 || '').localeCompare(b.address1_telephone1 || ''),
            renderHeaderCell: () => 'Phone',
            renderCell: (account) => account.address1_telephone1 || '-',
        }),
        createTableColumn<accounts>({
            columnId: 'website',
            compare: (a, b) => (a.websiteurl || '').localeCompare(b.websiteurl || ''),
            renderHeaderCell: () => 'Website',
            renderCell: (account) => account.websiteurl || '-',
        }),
        createTableColumn<accounts>({
            columnId: 'actions',
            renderHeaderCell: () => 'Actions',
            renderCell: (account) => (
                <MenuButton
                    icon={<MoreHorizontalRegular />}
                    className={styles.actionButton}
                    size="small"
                    appearance="subtle"
                >
                    <Menu>
                        <MenuList>
                            <MenuItem
                                icon={<EditRegular />}
                                onClick={() => handleEdit(account)}
                            >
                                Edit
                            </MenuItem>
                            <MenuItem
                                icon={<DeleteRegular />}
                                onClick={() => handleDelete(account.accountid || '')}
                            >
                                Delete
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </MenuButton>
            ),
        }),
    ], [styles.actionButton, handleDelete, handleEdit]);

    const headerContent = (
        <div className={styles.headerContainer}>
            {/* Title */}
            <Title1 className={styles.titleRow}>Accounts</Title1>

            {/* Toolbar */}
            <div className={styles.toolbarRow}>
                <div className={styles.searchContainer}>
                    <SearchBox
                        placeholder="Search accounts..."
                        value={searchTerm}
                        onChange={(_, data) => setSearchTerm(data.value)}
                        contentBefore={<SearchRegular />}
                        className={styles.searchBox}
                    />
                    <Button
                        icon={<ArrowClockwiseRegular />}
                        onClick={loadAccounts}
                        disabled={loading}
                        size="medium"
                        appearance="subtle"
                        title="Refresh"
                    >
                        Refresh
                    </Button>
                </div>

                <Button
                    appearance="primary"
                    icon={<AddRegular />}
                    onClick={handleCreate}
                    size="medium"
                >
                    New Account
                </Button>
            </div>

            {/* Messages */}
            {error && (
                <MessageBar intent="error">
                    <MessageBarBody>{error}</MessageBarBody>
                </MessageBar>
            )}
            {success && (
                <MessageBar intent="success">
                    <MessageBarBody>{success}</MessageBarBody>
                </MessageBar>
            )}
        </div>
    );

    return (
        <BasePage header={headerContent}>
            {/* Data Grid */}
            {loading ? (
                <div className={styles.loadingContainer}>
                    <Spinner size="large" />
                    <Text>Loading accounts...</Text>
                </div>
            ) : filteredAccounts.length === 0 ? (
                <div className={styles.emptyState}>
                    <Text size={400}>
                        {searchTerm ? 'No accounts found matching your search.' : 'No accounts found.'}
                    </Text>
                </div>
            ) : (
                <div className={styles.gridContainer}>
                    <DataGrid
                        items={filteredAccounts}
                        columns={columns}
                        sortable
                        getRowId={(account) => account.accountid ?? crypto.randomUUID()}
                        aria-label="Accounts data grid"
                    >
                        <DataGridHeader>
                            <DataGridRow>
                                {({ renderHeaderCell }) => (
                                    <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                                )}
                            </DataGridRow>
                        </DataGridHeader>
                        <DataGridBody<accounts>>
                            {({ item, rowId }) => (
                                <DataGridRow<accounts> key={rowId}>
                                    {({ renderCell }) => (
                                        <DataGridCell>{renderCell(item)}</DataGridCell>
                                    )}
                                </DataGridRow>
                            )}
                        </DataGridBody>
                    </DataGrid>
                </div>
            )}

            {/* Create Dialog */}
            <Dialog open={isCreateDialogOpen} onOpenChange={(_, data) => setIsCreateDialogOpen(data.open)}>
                <DialogSurface>
                    <DialogTitle>Create New Account</DialogTitle>
                    <DialogContent>
                        <DialogBody>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
                                <Field label="Account Name" required>
                                    <Input
                                        value={formData.name}
                                        onChange={(_, data) => handleInputChange('name', data.value)}
                                        placeholder="Enter account name"
                                    />
                                </Field>
                                <Field label="Account Number">
                                    <Input
                                        value={formData.accountnumber}
                                        onChange={(_, data) => handleInputChange('accountnumber', data.value)}
                                        placeholder="Enter account number"
                                    />
                                </Field>
                                <Field label="Email">
                                    <Input
                                        type="email"
                                        value={formData.emailaddress1}
                                        onChange={(_, data) => handleInputChange('emailaddress1', data.value)}
                                        placeholder="Enter email address"
                                    />
                                </Field>
                                <Field label="Phone">
                                    <Input
                                        type="tel"
                                        value={formData.address1_telephone1}
                                        onChange={(_, data) => handleInputChange('address1_telephone1', data.value)}
                                        placeholder="Enter phone number"
                                    />
                                </Field>
                                <Field label="Website">
                                    <Input
                                        type="url"
                                        value={formData.websiteurl}
                                        onChange={(_, data) => handleInputChange('websiteurl', data.value)}
                                        placeholder="Enter website URL"
                                    />
                                </Field>
                            </div>
                        </DialogBody>
                        <DialogActions>
                            <Button onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                            <Button
                                appearance="primary"
                                onClick={handleSubmitCreate}
                                disabled={isSubmitting || !formData.name.trim()}
                            >
                                {isSubmitting ? 'Creating...' : 'Create'}
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </DialogSurface>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={(_, data) => setIsEditDialogOpen(data.open)}>
                <DialogSurface>
                    <DialogTitle>Edit Account</DialogTitle>
                    <DialogContent>
                        <DialogBody>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
                                <Field label="Account Name" required>
                                    <Input
                                        value={formData.name}
                                        onChange={(_, data) => handleInputChange('name', data.value)}
                                        placeholder="Enter account name"
                                    />
                                </Field>
                                <Field label="Account Number">
                                    <Input
                                        value={formData.accountnumber}
                                        onChange={(_, data) => handleInputChange('accountnumber', data.value)}
                                        placeholder="Enter account number"
                                    />
                                </Field>
                                <Field label="Email">
                                    <Input
                                        type="email"
                                        value={formData.emailaddress1}
                                        onChange={(_, data) => handleInputChange('emailaddress1', data.value)}
                                        placeholder="Enter email address"
                                    />
                                </Field>
                                <Field label="Phone">
                                    <Input
                                        type="tel"
                                        value={formData.address1_telephone1}
                                        onChange={(_, data) => handleInputChange('address1_telephone1', data.value)}
                                        placeholder="Enter phone number"
                                    />
                                </Field>
                                <Field label="Website">
                                    <Input
                                        type="url"
                                        value={formData.websiteurl}
                                        onChange={(_, data) => handleInputChange('websiteurl', data.value)}
                                        placeholder="Enter website URL"
                                    />
                                </Field>
                            </div>
                        </DialogBody>
                        <DialogActions>
                            <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                            <Button
                                appearance="primary"
                                onClick={handleSubmitEdit}
                                disabled={isSubmitting || !formData.name.trim()}
                            >
                                {isSubmitting ? 'Updating...' : 'Update'}
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </DialogSurface>
            </Dialog>
        </BasePage>
    );
};

export default AccountsPage;
