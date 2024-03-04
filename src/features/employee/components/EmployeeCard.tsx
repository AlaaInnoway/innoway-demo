import {
  ArrowUpTrayIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  EnvelopeIcon,
  PhoneIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import Avatar from '../../../components/ui/Avatar';
import { TertiaryButton } from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import DropdownAction from '../../../components/ui/DropdownAction';
import API_BASE_URL from '../../../config';
import useUploadImage from '../../../hooks/useUploadImage';

export default function EmployeeCard(props: any) {
  const { employee, editable, enabled, actionMenu } = props;
  const [openToast, setOpenToast] = useState(false);
  const [toastData, setToastData] = useState({ title: '', type: '' });

  // Create a ref for the file input
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState('');

  const queryKey = 'searchData';
  const uploadImage = useUploadImage(queryKey); // Use the custom hook
  const handleUpload = async (id: number, file: any) => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        // Call the mutate function to update the record
        await uploadImage.mutateAsync({
          modelName: 'Employee', // Model name
          recordId: id, // Record ID
          file: formData,
        });
        setOpenToast(!openToast);
        // Handle toast info or further actions
        setToastData({
          title: 'Image have been changed',
          type: 'info',
        });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setOpenToast(!openToast);
      // Handle toast error or further actions
      setToastData({
        title: 'Error uploading image',
        type: 'error',
      });
    }
  };

  const handleImageChange = (e: {
    target: {
      files: any;
      name: any;
      value: any;
    };
  }) => {
    console.log('e.target');
    console.log(e.target);
    console.log(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
    handleUpload(employee.id, e.target.files[0]);
  };

  const convertEnumText = (enumText: string): string => {
    console.log('==> enumText');
    console.log(enumText);
    if (enumText === undefined) return '';
    const words = enumText.toLowerCase().split('_');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(' ');
  };

  const handleStatusBadgeColor = (status: string) => {
    let color = '';
    switch (status) {
      case 'ACTIVE':
        color = 'green';
        break;
      case 'ON_LEAVE':
        color = 'orange';
        break;
      case 'TERMINATED':
        color = 'red';
        break;
      default:
        break;
    }
    return color;
  };

  return (
    <Card>
      <div className="group space-y-6">
        {enabled && (
          <div className="absolute right-4 z-20 invisible group-hover:visible">
            <DropdownAction actionMenu={actionMenu} recordId={employee.id} />
          </div>
        )}
        <div className="">
          <div className={`flex space-x-4 ${enabled && '-mt-6'}`}>
            <div className="relative">
              <Avatar
                size="md"
                icon={<div>{employee.name[0]}</div>}
                src={image || (employee.img && API_BASE_URL + employee.img)}
                title={employee.name}
              />
              {editable && (
                <>
                  <ArrowUpTrayIcon
                    width={24}
                    height={24}
                    className="absolute -right-1.5 -top-1.5 z-50 bg-gray-50 text-serene-600 p-1 rounded-md shadow-md cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  />
                  <input
                    type="file"
                    id="imageInput"
                    name="image"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                </>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <h1 className="font-medium">{employee.name}</h1>
                <Badge
                  value={convertEnumText(employee.status)}
                  color={handleStatusBadgeColor(employee.status)}
                  size="xs"
                />
              </div>
              <p className="text-gray-500 text-[11px]">
                {employee.jobTitle?.name}{' '}
                {employee.department && `@ ${employee.department?.name}`}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <EnvelopeIcon width="16" height="16" className="text-gray-700" />
            <div className="text-gray-700 text-xs">{employee.email}</div>
          </div>
          <div className="flex items-center space-x-2">
            <PhoneIcon width="16" height="16" className="text-gray-700" />
            <div className="text-gray-700 text-xs">
              {employee.phone} {employee.mobile && `/ ${employee.mobile}`}
            </div>
          </div>
          {employee.leaves && employee.reviewsOfEmployee && employee.contracts && (
            <div className="flex items-center justify-center space-x-8 pt-4 border-t border-t-gray-200 font-medium text-serene-700">
              <TertiaryButton disabled={editable}>
                <ClockIcon width="16" height="16" />
                <span>{employee.leaves?.length} Leaves</span>
              </TertiaryButton>
              <TertiaryButton disabled={editable}>
                <StarIcon width="16" height="16" />
                <span>{employee.reviewsOfEmployee?.length} Reviews</span>
              </TertiaryButton>
              <TertiaryButton disabled={editable}>
                <ClipboardDocumentListIcon width="16" height="16" />
                <span>{employee.contracts?.length} Contracts</span>
              </TertiaryButton>
            </div>
          )}
        </div>
        {employee.supervisor && (
          <div className="flex items-center absolute bottom-16 right-4">
            <Avatar
              src={employee.supervisor?.img}
              title={employee.supervisor?.name}
            />
          </div>
        )}
      </div>
    </Card>
  );
}
