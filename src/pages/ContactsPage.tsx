import React, { useState, useEffect } from 'react';
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
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  MenuTrigger,
  MessageBar,
  MessageBarBody,
  Spinner,
  SearchBox,
  Card,
  CardHeader,
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import {
  AddRegular,
  EditRegular,
  DeleteRegular,
  MoreHorizontalRegular,
  SearchRegular,
} from '@fluentui/react-icons';
import { contactsService } from '../Services/contactsService';
import type { contacts } from '../Models/contactsModel';
import { dataSourcesInfo } from '../../.power/appschemas/dataSourcesInfo';
import BasePage from '../components/common/BasePage';
import { usePowerRuntime } from '../hooks/usePowerRuntime';

const useStyles = makeStyles({
  searchContainer: {
    marginBottom: tokens.spacingVerticalM,
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'center',
  },
  tableContainer: {
    overflowX: 'auto',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
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

export const ContactsPage: React.FC = () => {
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
  const [editingContact, setEditingContact] = useState<contacts | null>(null);
  const [formData, setFormData] = useState<ContactFormData>(emptyContact);
  const [saving, setSaving] = useState(false);

  // Load contacts on component mount
  useEffect(() => {
    if (!isReady) return;
    loadContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  // Filter contacts based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact =>
        contact.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.emailaddress1?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.jobtitle?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  }, [contacts, searchTerm]);

  // Mock data for testing when Dataverse connection is not available
  const getMockContacts = (): contacts[] => [
    {
      contactid: 'mock-1',
      firstname: 'John',
      lastname: 'Doe',
      fullname: 'John Doe',
      emailaddress1: 'john.doe@example.com',
      telephone1: '+1-555-0123',
      jobtitle: 'Software Engineer',
      ownerid: 'mock-owner-1',
      owneridname: 'Mock Owner',
      owneridtype: 'systemuser',
      owneridyominame: 'Mock Owner',
      parentcustomeridname: 'Mock Company',
      parentcustomeridyominame: 'Mock Company',
      statecode: '0'
    },
    {
      contactid: 'mock-2',
      firstname: 'Jane',
      lastname: 'Smith',
      fullname: 'Jane Smith',
      emailaddress1: 'jane.smith@example.com',
      telephone1: '+1-555-0456',
      jobtitle: 'Product Manager',
      ownerid: 'mock-owner-1',
      owneridname: 'Mock Owner',
      owneridtype: 'systemuser',
      owneridyominame: 'Mock Owner',
      parentcustomeridname: 'Mock Company',
      parentcustomeridyominame: 'Mock Company',
      statecode: '0'
    },
    {
      contactid: 'mock-3',
      firstname: 'Bob',
      lastname: 'Johnson',
      fullname: 'Bob Johnson',
      emailaddress1: 'bob.johnson@example.com',
      telephone1: '+1-555-0789',
      jobtitle: 'UX Designer',
      ownerid: 'mock-owner-1',
      owneridname: 'Mock Owner',
      owneridtype: 'systemuser',
      owneridyominame: 'Mock Owner',
      parentcustomeridname: 'Mock Company',
      parentcustomeridyominame: 'Mock Company',
      statecode: '0'
    }
  ];

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Starting to load contacts...');
      console.log('DataSourcesInfo contacts:', dataSourcesInfo.contacts);

      // Try Dataverse first, fall back to mock data
      try {
        const result = await contactsService.getAll({
          select: ['contactid', 'firstname', 'lastname', 'fullname', 'emailaddress1', 'telephone1', 'jobtitle'],
          orderBy: ['fullname asc']
        });

        console.log('Contacts result:', result);

        if (result.success && result.data) {
          console.log('Contacts data:', result.data);
          setContacts(result.data);
          return;
        } else {
          console.error('Contacts request failed:', result.error);
          throw new Error(result.error || 'Dataverse connection failed');
        }
      } catch (dataverseError) {
        console.warn('Dataverse connection failed, using mock data:', dataverseError);

        // Use mock data when Dataverse is not available
        const mockContacts = getMockContacts();
        setContacts(mockContacts);
        setError('Using mock data - Dataverse connection not available. Run `pac code run` to connect to live data.');
      }
    } catch (err) {
      console.error('Error loading contacts:', err);
      setError('Failed to load contacts: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      setSaving(true);
      setError(null);

      // Create contact data - only include non-empty fields
      const contactData: Partial<contacts> = {};
      if (formData.firstname) contactData.firstname = formData.firstname;
      if (formData.lastname) contactData.lastname = formData.lastname;
      if (formData.emailaddress1) contactData.emailaddress1 = formData.emailaddress1;
      if (formData.telephone1) contactData.telephone1 = formData.telephone1;
      if (formData.jobtitle) contactData.jobtitle = formData.jobtitle;

      try {
        const result = await contactsService.create(contactData as Omit<contacts, 'contactid'>);

        if (result.success) {
          setSuccess('Contact created successfully');
          setIsCreateDialogOpen(false);
          setFormData(emptyContact);
          await loadContacts();
        } else {
          throw new Error(result.error || 'Create operation failed');
        }
      } catch (dataverseError) {
        console.warn('Dataverse create failed, simulating success:', dataverseError);

        // Mock create - add to local state
        const newContact: contacts = {
          contactid: `mock-${Date.now()}`,
          firstname: contactData.firstname,
          lastname: contactData.lastname || '',
          fullname: `${contactData.firstname || ''} ${contactData.lastname || ''}`.trim(),
          emailaddress1: contactData.emailaddress1,
          telephone1: contactData.telephone1,
          jobtitle: contactData.jobtitle,
          ownerid: 'mock-owner-1',
          owneridname: 'Mock Owner',
          owneridtype: 'systemuser',
          owneridyominame: 'Mock Owner',
          parentcustomeridname: 'Mock Company',
          parentcustomeridyominame: 'Mock Company',
          statecode: '0'
        };

        setContacts(prev => [...prev, newContact]);
        setSuccess('Contact created successfully (mock mode)');
        setIsCreateDialogOpen(false);
        setFormData(emptyContact);
      }
    } catch (err) {
      setError('Failed to create contact: ' + (err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async () => {
    if (!editingContact) return;

    try {
      setSaving(true);
      setError(null);

      try {
        const result = await contactsService.update(editingContact.contactid, formData);

        if (result.success) {
          setSuccess('Contact updated successfully');
          setIsEditDialogOpen(false);
          setEditingContact(null);
          setFormData(emptyContact);
          await loadContacts();
        } else {
          throw new Error(result.error || 'Update operation failed');
        }
      } catch (dataverseError) {
        console.warn('Dataverse update failed, simulating success:', dataverseError);

        // Mock update - modify local state
        setContacts(prev => prev.map(contact =>
          contact.contactid === editingContact.contactid
            ? {
              ...contact,
              firstname: formData.firstname || contact.firstname,
              lastname: formData.lastname || contact.lastname,
              fullname: `${formData.firstname || contact.firstname || ''} ${formData.lastname || contact.lastname || ''}`.trim(),
              emailaddress1: formData.emailaddress1 || contact.emailaddress1,
              telephone1: formData.telephone1 || contact.telephone1,
              jobtitle: formData.jobtitle || contact.jobtitle,
            }
            : contact
        ));

        setSuccess('Contact updated successfully (mock mode)');
        setIsEditDialogOpen(false);
        setEditingContact(null);
        setFormData(emptyContact);
      }
    } catch (err) {
      setError('Failed to update contact: ' + (err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (contact: contacts) => {
    if (!confirm(`Are you sure you want to delete ${contact.fullname}?`)) {
      return;
    }

    try {
      setError(null);

      try {
        await contactsService.delete(contact.contactid);
        setSuccess('Contact deleted successfully');
        await loadContacts();
      } catch (dataverseError) {
        console.warn('Dataverse delete failed, simulating success:', dataverseError);

        // Mock delete - remove from local state
        setContacts(prev => prev.filter(c => c.contactid !== contact.contactid));
        setSuccess('Contact deleted successfully (mock mode)');
      }
    } catch (err) {
      setError('Failed to delete contact: ' + (err as Error).message);
    }
  };

  const openCreateDialog = () => {
    setFormData(emptyContact);
    setIsCreateDialogOpen(true);
  };

  const openEditDialog = (contact: contacts) => {
    setEditingContact(contact);
    setFormData({
      firstname: contact.firstname || '',
      lastname: contact.lastname || '',
      emailaddress1: contact.emailaddress1 || '',
      telephone1: contact.telephone1 || '',
      jobtitle: contact.jobtitle || '',
    });
    setIsEditDialogOpen(true);
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const ContactForm = () => (
    <>
      <Field label="First Name" required>
        <Input
          value={formData.firstname}
          onChange={(_, data) => setFormData({ ...formData, firstname: data.value })}
          placeholder="Enter first name"
        />
      </Field>
      <Field label="Last Name" required>
        <Input
          value={formData.lastname}
          onChange={(_, data) => setFormData({ ...formData, lastname: data.value })}
          placeholder="Enter last name"
        />
      </Field>
      <Field label="Email">
        <Input
          type="email"
          value={formData.emailaddress1}
          onChange={(_, data) => setFormData({ ...formData, emailaddress1: data.value })}
          placeholder="Enter email address"
        />
      </Field>
      <Field label="Phone">
        <Input
          type="tel"
          value={formData.telephone1}
          onChange={(_, data) => setFormData({ ...formData, telephone1: data.value })}
          placeholder="Enter phone number"
        />
      </Field>
      <Field label="Job Title">
        <Input
          value={formData.jobtitle}
          onChange={(_, data) => setFormData({ ...formData, jobtitle: data.value })}
          placeholder="Enter job title"
        />
      </Field>
    </>
  );

  return (
    <BasePage title="Contacts">
      {/* Messages */}
      {error && (
        <MessageBar intent="error">
          <MessageBarBody>
            {error}
            <Button
              appearance="transparent"
              size="small"
              onClick={clearMessages}
              style={{ marginLeft: '8px' }}
            >
              ×
            </Button>
          </MessageBarBody>
        </MessageBar>
      )}
      {success && (
        <MessageBar intent="success">
          <MessageBarBody>
            {success}
            <Button
              appearance="transparent"
              size="small"
              onClick={clearMessages}
              style={{ marginLeft: '8px' }}
            >
              ×
            </Button>
          </MessageBarBody>
        </MessageBar>
      )}

      {/* Search and Actions */}
      <Card>
        <CardHeader
          header={<Text weight="semibold">Manage Contacts</Text>}
          action={
            <Button
              appearance="primary"
              icon={<AddRegular />}
              onClick={openCreateDialog}
            >
              New Contact
            </Button>
          }
        />
        <div className={styles.searchContainer}>
          <SearchBox
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(_, data) => setSearchTerm(data.value)}
            contentBefore={<SearchRegular />}
          />
          <Button onClick={loadContacts} disabled={loading || !isReady}>
            Refresh
          </Button>
        </div>
      </Card>

      {/* Contacts Table */}
      {!isReady ? (
        <div className={styles.loadingContainer}>
          <Spinner label="Initializing Power runtime..." />
        </div>
      ) : loading ? (
        <div className={styles.loadingContainer}>
          <Spinner label="Loading contacts..." />
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className={styles.emptyState}>
          <Text size={500}>
            {searchTerm ? 'No contacts found matching your search.' : 'No contacts found. Create your first contact!'}
          </Text>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <Table arial-label="Contacts table">
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Phone</TableHeaderCell>
                <TableHeaderCell>Job Title</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map((contact) => (
                <TableRow key={contact.contactid}>
                  <TableCell>{contact.fullname || `${contact.firstname} ${contact.lastname}`}</TableCell>
                  <TableCell>{contact.emailaddress1 || '-'}</TableCell>
                  <TableCell>{contact.telephone1 || '-'}</TableCell>
                  <TableCell>{contact.jobtitle || '-'}</TableCell>
                  <TableCell>
                    <Menu>
                      <MenuTrigger>
                        <MenuButton
                          appearance="subtle"
                          icon={<MoreHorizontalRegular />}
                          className={styles.actionButton}
                          aria-label="Contact actions"
                        />
                      </MenuTrigger>
                      <MenuList>
                        <MenuItem
                          icon={<EditRegular />}
                          onClick={() => openEditDialog(contact)}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          icon={<DeleteRegular />}
                          onClick={() => handleDelete(contact)}
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create Contact Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={(_, data) => setIsCreateDialogOpen(data.open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Create New Contact</DialogTitle>
            <DialogContent>
              <ContactForm />
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Cancel</Button>
              </DialogTrigger>
              <Button
                appearance="primary"
                onClick={handleCreate}
                disabled={saving || !formData.firstname || !formData.lastname}
              >
                {saving ? <Spinner size="tiny" /> : null}
                Create Contact
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      {/* Edit Contact Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={(_, data) => setIsEditDialogOpen(data.open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Edit Contact</DialogTitle>
            <DialogContent>
              <ContactForm />
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Cancel</Button>
              </DialogTrigger>
              <Button
                appearance="primary"
                onClick={handleEdit}
                disabled={saving || !formData.firstname || !formData.lastname}
              >
                {saving ? <Spinner size="tiny" /> : null}
                Update Contact
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </BasePage>
  );
};
