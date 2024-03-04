import { useCallback, useEffect, useMemo, useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import useItemList from '../../../hooks/useItemList';
import { IconButton } from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import TermItem, { NewTermItem } from './TermItem';
import Paginator from '../../../components/ui/Paginator';
import { FilterRequest } from '../../../interfaces/filter-request.interface';
import useFilterData from '../../../hooks/useFetchData';
import { fetchCountData } from '../../../services/filter.service';

export default function TermList(props: any) {
  const { contractId, editable } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [columns, setColumns] = useState<any[]>([
    {
      id: 'name',
      name: 'Term and Condition',
      sequence: 1,
    },
  ]);

  const modelName = 'Term';

  const initialItem = {
    id: undefined,
    contractId,
    name: '',
  };

  const filterData: FilterRequest = useMemo(() => {
    return {
      modelName,
      filters: [
        {
          logicalOperator: 'AND',
          conditions: [
            {
              field: 'contractId',
              operator: 'equals',
              values: contractId,
            },
          ],
        },
      ],
      selectFields: ['id', 'contractId', 'name'],
      sortField: 'id',
      sortOrder: 'asc',
      page: currentPage,
      perPage: 5,
      groupByField: undefined,
      groupByAggregates: [],
      aggregates: [],
    };
  }, [contractId, currentPage]);
  const { data, isLoading } = useFilterData(filterData);
  const [totalItems, setTotalItems] = useState(0);

  const handleUpdateCount = useCallback(() => {
    fetchCountData(filterData).then((count: number) => {
      setTotalItems(count);
    });
  }, [filterData]);

  useEffect(() => {
    handleUpdateCount();
  }, [handleUpdateCount]);

  const {
    newLineEnabled,
    editedItem,
    newItem,
    items,
    enableNewLine,
    handleItemFieldChange,
    handleEditedItemFieldChange,
    handleSaveChanges,
    handleDiscardChanges,
    handleEditItem,
    handleSaveEditedItem,
    handleCancelEdit,
    handleDeleteItem,
  } = useItemList(modelName, data?.records, initialItem);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <div className="flex items-center justify-between mb-5">
        <h1>Terms and Conditions</h1>
        <IconButton
          disabled={editable || editedItem?.id}
          onClick={enableNewLine}
          customClass="group"
        >
          <PlusCircleIcon
            width={16}
            height={16}
            className="stroke-serene-500 group-hover:stroke-gray-900"
          />
          <span className="text-xs text-serene-500 group-hover:text-gray-900">
            Add term
          </span>
        </IconButton>
      </div>
      <Table
        columns={columns}
        optionalColumns={[]}
        handleColumnChange={() => null}
      >
        {newLineEnabled && (
          <NewTermItem
            newItem={newItem}
            editable={editable}
            onChangeField={handleItemFieldChange}
            onChangeSelect={() => null}
            onSave={handleSaveChanges}
            onDiscard={handleDiscardChanges}
          />
        )}
        {items?.map((item: any, index: number) => (
          <TermItem
            key={item.id}
            index={index + 1 + (currentPage - 1) * 5}
            item={item}
            editedItem={editedItem}
            count={totalItems}
            editable={editable || newLineEnabled}
            onEdit={handleEditItem}
            onSaveEdit={handleSaveEditedItem}
            onCancelEdit={handleCancelEdit}
            onDelete={handleDeleteItem}
            onChangeField={handleEditedItemFieldChange}
            onChangeSelect={() => null}
          />
        ))}
      </Table>
      <Paginator
        itemsPerPage={5}
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
