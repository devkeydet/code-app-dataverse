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
import { contactsService } from '../Services/contactsService';
import type { contacts } from '../Models/contactsModel';
import { usePowerRuntime } from '../hooks/usePowerRuntime';
import SimpleBasePage from '../components/common/SimpleBasePage';

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

interface ContactFormData {
    firstname?: string;
    lastname: string;
    emailaddress1?: string;
    telephone1?: string;
    jobtitle?: string;
}

const emptyContact: ContactFormData = {
    firstname: '',
    lastname: '',
    emailaddress1: '',
    telephone1: '',
    jobtitle: '',
};

export const ContactsPageNew: React.FC = () => {
    const styles = useStyles();
    const { isReady } = usePowerRuntime();
    const [contacts, setContacts] = useState<contacts[]>([]);
    const [filteredContacts, setFilteredContacts] = useState<contacts[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Form state
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [formData, setFormData] = useState<ContactFormData>(emptyContact);
    const [editingContactId, setEditingContactId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load contacts
    const loadContacts = useCallback(async () => {
        if (!isReady) return;

        setLoading(true);
        setError(null);

        try {
            const result = await contactsService.getAll({
                orderBy: ['fullname'],
                top: 100
            });
            if (result?.success) {
                const contactsList = (result.data as contacts[]) || [];
                setContacts(contactsList);
                setFilteredContacts(contactsList);
            } else {
                setError('Failed to load contacts');
                setContacts([]);
                setFilteredContacts([]);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load contacts');
            setContacts([]);
            setFilteredContacts([]);
        } finally {
            setLoading(false);
        }
    }, [isReady]);

    // Search filtering
    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredContacts(contacts);
        } else {
            const filtered = contacts.filter(contact =>
                contact.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.emailaddress1?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.telephone1?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.jobtitle?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredContacts(filtered);
        }
    }, [contacts, searchTerm]);

    // Load contacts when ready
    useEffect(() => {
        loadContacts();
    }, [loadContacts]);

    // Form handlers
    const handleInputChange = (field: keyof ContactFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCreate = () => {
        setFormData(emptyContact);
        setIsCreateDialogOpen(true);
    };

    const handleEdit = useCallback((contact: contacts) => {
        setFormData({
            firstname: contact.firstname || '',
            lastname: contact.lastname || '',
            emailaddress1: contact.emailaddress1 || '',
            telephone1: contact.telephone1 || '',
            jobtitle: contact.jobtitle || '',
        });
        setEditingContactId(contact.contactid || null);
        setIsEditDialogOpen(true);
    }, []);

    const handleDelete = useCallback(async (contactId: string) => {
        if (!window.confirm('Are you sure you want to delete this contact?')) {
            return;
        }

        try {
            await contactsService.delete(contactId);
            setSuccess('Contact deleted successfully');
            loadContacts();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete contact');
        }
    }, [loadContacts]);

    const handleSubmitCreate = async () => {
        if (!formData.lastname.trim()) {
            setError('Last name is required');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const result = await contactsService.create(formData as Omit<contacts, 'contactid'>);
            if (result?.success) {
                setSuccess('Contact created successfully');
                setIsCreateDialogOpen(false);
                setFormData(emptyContact);
                loadContacts();
            } else {
                setError('Failed to create contact');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create contact');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitEdit = async () => {
        if (!formData.lastname.trim() || !editingContactId) {
            setError('Last name is required');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const result = await contactsService.update(editingContactId, formData);
            if (result?.success) {
                setSuccess('Contact updated successfully');
                setIsEditDialogOpen(false);
                setFormData(emptyContact);
                setEditingContactId(null);
                loadContacts();
            } else {
                setError('Failed to update contact');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update contact');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Column definitions
    const columns: TableColumnDefinition<contacts>[] = useMemo(() => [
        createTableColumn<contacts>({
            columnId: 'name',
            compare: (a, b) => (a.fullname || '').localeCompare(b.fullname || ''),
            renderHeaderCell: () => 'Name',
            renderCell: (contact) => contact.fullname || '-',
        }),
        createTableColumn<contacts>({
            columnId: 'email',
            compare: (a, b) => (a.emailaddress1 || '').localeCompare(b.emailaddress1 || ''),
            renderHeaderCell: () => 'Email',
            renderCell: (contact) => contact.emailaddress1 || '-',
        }),
        createTableColumn<contacts>({
            columnId: 'phone',
            compare: (a, b) => (a.telephone1 || '').localeCompare(b.telephone1 || ''),
            renderHeaderCell: () => 'Phone',
            renderCell: (contact) => contact.telephone1 || '-',
        }),
        createTableColumn<contacts>({
            columnId: 'jobTitle',
            compare: (a, b) => (a.jobtitle || '').localeCompare(b.jobtitle || ''),
            renderHeaderCell: () => 'Job Title',
            renderCell: (contact) => contact.jobtitle || '-',
        }),
        createTableColumn<contacts>({
            columnId: 'actions',
            renderHeaderCell: () => 'Actions',
            renderCell: (contact) => (
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
                                onClick={() => handleEdit(contact)}
                            >
                                Edit
                            </MenuItem>
                            <MenuItem
                                icon={<DeleteRegular />}
                                onClick={() => handleDelete(contact.contactid || '')}
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
            <Title1 className={styles.titleRow}>Contacts</Title1>

            {/* Toolbar */}
            <div className={styles.toolbarRow}>
                <div className={styles.searchContainer}>
                    <SearchBox
                        placeholder="Search contacts..."
                        value={searchTerm}
                        onChange={(_, data) => setSearchTerm(data.value)}
                        contentBefore={<SearchRegular />}
                        className={styles.searchBox}
                    />
                    <Button
                        icon={<ArrowClockwiseRegular />}
                        onClick={loadContacts}
                        disabled={loading}
                        size="medium"
                        appearance="subtle"
                        title="Refresh"
                    />
                </div>
                <Button
                    icon={<AddRegular />}
                    appearance="primary"
                    onClick={handleCreate}
                    size="medium"
                >
                    New Contact
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
        <SimpleBasePage header={headerContent}>
            {/* Data Grid */}
            {loading ? (
                <div className={styles.loadingContainer}>
                    <Spinner size="large" />
                    <Text>Loading contacts...</Text>
                </div>
            ) : filteredContacts.length === 0 ? (
                <div className={styles.emptyState}>
                    <Text size={400}>
                        {searchTerm ? 'No contacts found matching your search.' : 'No contacts found.'}
                    </Text>
                </div>
            ) : (
                <div className={styles.gridContainer}>
                    <DataGrid
                        items={filteredContacts}
                        columns={columns}
                        sortable
                        getRowId={(contact) => contact.contactid ?? crypto.randomUUID()}
                        aria-label="Contacts data grid"
                    >
                        <DataGridHeader>
                            <DataGridRow>
                                {({ renderHeaderCell }) => (
                                    <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                                )}
                            </DataGridRow>
                        </DataGridHeader>
                        <DataGridBody<contacts>>
                            {({ item, rowId }) => (
                                <DataGridRow<contacts> key={rowId}>
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
                    <DialogTitle>Create New Contact</DialogTitle>
                    <DialogContent>
                        <DialogBody>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
                                <Field label="First Name">
                                    <Input
                                        value={formData.firstname}
                                        onChange={(_, data) => handleInputChange('firstname', data.value)}
                                        placeholder="Enter first name"
                                    />
                                </Field>
                                <Field label="Last Name" required>
                                    <Input
                                        value={formData.lastname}
                                        onChange={(_, data) => handleInputChange('lastname', data.value)}
                                        placeholder="Enter last name"
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
                                        value={formData.telephone1}
                                        onChange={(_, data) => handleInputChange('telephone1', data.value)}
                                        placeholder="Enter phone number"
                                    />
                                </Field>
                                <Field label="Job Title">
                                    <Input
                                        value={formData.jobtitle}
                                        onChange={(_, data) => handleInputChange('jobtitle', data.value)}
                                        placeholder="Enter job title"
                                    />
                                </Field>
                            </div>
                        </DialogBody>
                        <DialogActions>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="secondary">Cancel</Button>
                            </DialogTrigger>
                            <Button
                                appearance="primary"
                                onClick={handleSubmitCreate}
                                disabled={isSubmitting || !formData.lastname.trim()}
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
                    <DialogTitle>Edit Contact</DialogTitle>
                    <DialogContent>
                        <DialogBody>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
                                <Field label="First Name">
                                    <Input
                                        value={formData.firstname}
                                        onChange={(_, data) => handleInputChange('firstname', data.value)}
                                        placeholder="Enter first name"
                                    />
                                </Field>
                                <Field label="Last Name" required>
                                    <Input
                                        value={formData.lastname}
                                        onChange={(_, data) => handleInputChange('lastname', data.value)}
                                        placeholder="Enter last name"
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
                                        value={formData.telephone1}
                                        onChange={(_, data) => handleInputChange('telephone1', data.value)}
                                        placeholder="Enter phone number"
                                    />
                                </Field>
                                <Field label="Job Title">
                                    <Input
                                        value={formData.jobtitle}
                                        onChange={(_, data) => handleInputChange('jobtitle', data.value)}
                                        placeholder="Enter job title"
                                    />
                                </Field>
                            </div>
                        </DialogBody>
                        <DialogActions>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="secondary">Cancel</Button>
                            </DialogTrigger>
                            <Button
                                appearance="primary"
                                onClick={handleSubmitEdit}
                                disabled={isSubmitting || !formData.lastname.trim()}
                            >
                                {isSubmitting ? 'Updating...' : 'Update'}
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </DialogSurface>
            </Dialog>
        </SimpleBasePage>
    );
};

export default ContactsPageNew;
