import { CheckIcon, ChevronRightIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Input from '../../../components/form/Input';
import { IconButton } from '../../../components/ui/Button';
import Toast from '../../../components/ui/Toast';
import useUpdateRecord from '../../../hooks/useUpdateRecord';

interface Props {
  data: any;
}

function Breadcrumb(props: Props) {
  const { data } = props;
  const [editable, setEditable] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState<any[]>([]);
  const [openToast, setOpenToast] = useState(false);
  const [toastData, setToastData] = useState({ title: '', type: '' });
  const [editedDashboard, setEditedDashboard] = useState<any>({
    name: '',
  });
  const { id } = useParams();
  const queryKey = 'filterData';
  const updateRecord = useUpdateRecord(queryKey);

  useEffect(() => {
    setEditedDashboard({
      ...editedDashboard,
      name: data?.name,
    })
  }, [data]);

  useEffect(() => {
    setEditedDashboard({
      ...editedDashboard,
      name: data?.name,
    })
  }, [data]);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setEditedDashboard({
      ...editedDashboard,
      [name]: value,
    });
  };

  const handleDiscard = () => {
    setEditedDashboard({
      ...editedDashboard,
      name: data?.name,
    });
    setEditable(!editable);
  }

  const handleUpdate = async () => {
    try {
      // Call the mutate function to update the record
      await updateRecord.mutateAsync({
        modelName: 'Dashboard', // Model name
        recordId: id ? parseInt(id, 10) : 0, // Record ID
        updates: editedDashboard, // Update data
      });
      setEditedDashboard({
        ...editedDashboard,
      });
      setOpenToast(!openToast);
      // Handle toast success or further actions
      setToastData({
        title: 'Dashboard title has been updated successfully',
        type: 'success',
      });
      setEditable(!editable);
    } catch (error) {
      console.error('Error creating record:', error);
      // Handle error
    }
  };
  
  useEffect(() => {
    // Update breadcrumb
    if (data?.name) {
      setBreadcrumbs([
        {
          name: 'Dashboard',
          path: '/dashboard',
        },
        {
          name: data.name,
          path: `/dashboard/${id}`,
        }
      ]);
      console.log(breadcrumbs)
    }
  }, [data?.name]);

  return (
    <>
      {openToast && <Toast title={toastData.title} type={toastData.type} />}
      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <nav className="flex items-center">
          <ol className="inline-flex items-center space-x-2 text-sm">
            {breadcrumbs.map((item, index) => (
              <li key={item.path}>
                <div className="flex items-baseline text-sm">
                  {index === 0 ? (
                    <Link
                      to={item.path}
                      className="text-gray-500 hover:text-gray-800"
                    >
                      {item.name}
                    </Link>
                  ) : index === breadcrumbs.length - 1 ? (
                    <>
                      <ChevronRightIcon
                        width={10}
                        height={10}
                        className="text-gray-500"
                      />
                      {
                        editable ? (
                          <div className='flex items-center space-x-2 pl-2'>
                            <Input 
                              name='name' 
                              value={editedDashboard?.name}
                              handleChange={handleInputChange}
                            />
                            <div className='flex items-center space-x-2'>
                              <IconButton onClick={handleUpdate}>
                                <CheckIcon width={16} height={16} className='text-serene-600' title='Save'/>
                              </IconButton>
                              <IconButton onClick={handleDiscard}>
                                <XMarkIcon width={16} height={16} className='text-serene-600' title='Discard'/>
                              </IconButton>
                            </div>
                          </div>
                        ) : (
                          <div className='flex items-center space-x-2'>
                            <span className="text-serene-600 ml-2">{editedDashboard?.name}</span>
                            {parseInt(localStorage.getItem('loggedInUserId') || '', 10) === data?.owner?.id && (
                              <IconButton onClick={() => setEditable(!editable)}>
                                <PencilSquareIcon width={16} height={16} className='text-serene-600' title='Edit Dashboard Title'/>
                              </IconButton>
                            )}
                          </div>
                        )
                      }
                    </>
                  ) : (
                    <>
                      <ChevronRightIcon
                        width={10}
                        height={10}
                        className="text-gray-500"
                      />
                      <Link
                        to={item.path}
                        className="text-gray-500 hover:text-gray-800 ml-2"
                      >
                        {item.name}
                      </Link>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </>
  );
}

export default Breadcrumb;
