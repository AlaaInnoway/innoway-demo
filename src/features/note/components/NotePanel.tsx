/* eslint-disable react/no-array-index-key */
import {
  CheckCircleIcon,
  DocumentPlusIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import Avatar from '../../../components/ui/Avatar';
import {
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
} from '../../../components/ui/Button';
import TextArea from '../../../components/form/TextArea';
import { FilterRequest } from '../../../interfaces/filter-request.interface';
import useFilterData from '../../../hooks/useFetchData';
import useCreateRecord from '../../../hooks/useCreateRecord';
import {
  formattedTime,
  retrieveDay,
  retrieveMonth,
  retrieveYear,
} from '../../../utils/formatDate';
import Toast from '../../../components/ui/Toast';
import Checkbox from '../../../components/form/Checkbox';

interface Props {
  recordId: number;
  modelName: string;
}

export default function NotePanel(props: Props) {
  const { modelName, recordId } = props;
  const [openEditor, setOpenEditor] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastData, setToastData] = useState({ title: '', type: '' });
  const [newNote, setNewNote] = useState({
    content: '',
    user: {
      connect: {
        id: parseInt(localStorage.getItem('loggedInUserId') || '', 10),
      },
    },
    modelName,
    recordId,
  });
  const [showOnlyMine, setShowOnlyMine] = useState(false);

  const filterData: FilterRequest = {
    modelName: 'Note',
    filters: [
      {
        logicalOperator: 'AND',
        conditions: [
          {
            field: 'modelName',
            operator: 'equals',
            values: modelName,
          },
          {
            field: 'recordId',
            operator: 'equals',
            values: recordId,
          },
          {
            logicalOperator: 'AND',
            conditions: showOnlyMine
              ? [
                  {
                    field: 'userId',
                    operator: 'equals',
                    values: parseInt(
                      localStorage.getItem('loggedInUserId') || '',
                      10
                    ),
                  },
                ]
              : [],
          },
        ],
      },
    ],
    selectFields: ['id', 'createdAt', 'content', 'user', 'modelName', 'recordId'],
    sortField: 'id',
    sortOrder: 'desc',
    page: 1,
    perPage: 1000,
    groupByField: undefined,
    groupByAggregates: [],
    aggregates: [],
  };
  const { data, isLoading } = useFilterData(filterData);
  const queryKey = 'filterData';
  const { createRecord } = useCreateRecord(queryKey);

  const handleCreate = async () => {
    try {
      await createRecord({
        modelName: 'Note',
        data: newNote,
      });
      setOpenEditor(!openEditor);
      setNewNote({
        ...newNote,
        content: '',
      });
      setOpenToast(!openToast);
      // Handle toast success or further actions
      setToastData({
        title: 'A new note have been added successfully',
        type: 'success',
      });
    } catch (error) {
      console.error('Error creating record:', error);
      // Handle error
    }
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setNewNote({
      ...newNote,
      [name]: value,
    });
  };

  return (
    <>
      {openToast && <Toast title={toastData.title} type={toastData.type} />}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Checkbox
            id="my-notes"
            name="my-notes"
            label="My Notes"
            value={showOnlyMine}
            handleChange={() => setShowOnlyMine(!showOnlyMine)}
          />
          <TertiaryButton onClick={() => setOpenEditor(!openEditor)}>
            <DocumentPlusIcon width={16} height={16} />
            <span>Log Note</span>
          </TertiaryButton>
        </div>
        {openEditor && (
          <div className="space-y-2">
            <TextArea
              name="content"
              value={newNote.content}
              placeholder="Type a note..."
              rows={6}
              handleChange={handleInputChange}
            />
            <div className="flex items-center justify-center space-x-4 pt-4">
              <SecondaryButton onClick={() => setOpenEditor(!openEditor)}>
                <XCircleIcon width={20} height={20} />
                <span>Discard</span>
              </SecondaryButton>
              <PrimaryButton onClick={() => handleCreate()}>
                <CheckCircleIcon width={20} height={20} />
                <span>Save</span>
              </PrimaryButton>
            </div>
          </div>
        )}
        <div className="space-y-4">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            data?.records?.map((note: any) => (
              <div className="-space-y-4 space-x-4" key={note.id}>
                <div className="p-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Avatar
                        size="sm"
                        icon={<div>{note.user?.name[0]}</div>}
                        /* src={note.user && API_BASE_URL + note.user.img} */
                        src={"https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg"}
                        title={note.user?.name}
                        rounded
                      />
                      <span className="text-[11px] font-medium">
                        {note.user?.name}
                      </span>
                    </div>
                    <span className='text-gray-500 text-[10px] italic font-medium'>
                      {retrieveDay(new Date(note.createdAt), '2-digit')}&nbsp;
                      {retrieveMonth(new Date(note.createdAt), 'short')}&nbsp;
                      {retrieveYear(new Date(note.createdAt), 'numeric')}&nbsp;
                      at {formattedTime(new Date(note.createdAt))}
                    </span>
                  </div>
                  <p className='flex items-center space-x-1 text-gray-700'>
                    {note.content.split('\n').map((item: string, index: number) => {
                      return <p key={index + item}>{item}</p>;
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
