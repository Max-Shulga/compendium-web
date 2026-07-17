'use client';

import { Alert, Button, Collapse, MultiSelect, Stack } from '@mantine/core';

import type { TRelatedItemsSection } from './models/related-items-section.model';
import styles from './RelatedItemsSection.module.css';

const RelatedItemsSection = ({
  label,
  options,
  selectedIds,
  onSelectionChange,
  placeholder,
  nothingFoundMessage,
  showCreateNew,
  addButtonLabel,
  isFormOpen,
  onToggleForm,
  isError,
  errorMessage,
  isPending,
  onSubmitNew,
  children
}: TRelatedItemsSection) => (
  <div className={styles.section}>
    <span className={styles.sectionLabel}>{label}</span>
    <Stack gap='sm'>
      <MultiSelect
        searchable
        data={options}
        nothingFoundMessage={nothingFoundMessage}
        placeholder={placeholder}
        value={selectedIds}
        onChange={onSelectionChange}
      />
      {showCreateNew && (
        <>
          <Button
            size='xs'
            style={{ alignSelf: 'flex-start' }}
            type='button'
            variant='subtle'
            onClick={onToggleForm}
          >
            {isFormOpen ? 'Cancel' : addButtonLabel}
          </Button>
          <Collapse expanded={isFormOpen}>
            <div className={styles.newItemPanel}>
              <Stack gap='sm'>
                {isError && (
                  <Alert color='red' variant='light'>
                    {errorMessage}
                  </Alert>
                )}
                {children}
                <Button
                  loading={isPending}
                  size='sm'
                  type='button'
                  variant='light'
                  onClick={onSubmitNew}
                >
                  Create and add
                </Button>
              </Stack>
            </div>
          </Collapse>
        </>
      )}
    </Stack>
  </div>
);

export default RelatedItemsSection;
