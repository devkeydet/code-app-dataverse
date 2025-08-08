import React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
    page: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
    },
    header: {
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: tokens.colorNeutralBackground1,
        padding: '16px 24px',
        flexShrink: 0, // Don't shrink the header
    },
    content: {
        flex: 1,
        overflow: 'auto',
        padding: '24px',
    },
    contentNoHeader: {
        flex: 1,
        overflow: 'auto',
        padding: '24px',
        height: '100vh',
    }
});

interface SimpleBasePageProps {
    header?: React.ReactNode;
    children: React.ReactNode;
}

const SimpleBasePage: React.FC<SimpleBasePageProps> = ({ header, children }) => {
    const styles = useStyles();

    return (
        <div className={styles.page}>
            {header && (
                <div className={styles.header}>
                    {header}
                </div>
            )}
            <div className={header ? styles.content : styles.contentNoHeader}>
                {children}
            </div>
        </div>
    );
};

export default SimpleBasePage;
