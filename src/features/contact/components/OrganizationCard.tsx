import {
  ArrowUpTrayIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  ReceiptPercentIcon,
  Square3Stack3DIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import Avatar from '../../../components/ui/Avatar';
import Toast from '../../../components/ui/Toast';
import { TertiaryButton } from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import DropdownAction from '../../../components/ui/DropdownAction';
import API_BASE_URL from '../../../config';
import useUploadImage from '../../../hooks/useUploadImage';

export default function OrganizationCard(props: any) {
  const { organization, editable, enabled, actionMenu } = props;
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
          modelName: 'Organization', // Model name
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
    handleUpload(organization.id, e.target.files[0]);
  };

  return (
    <Card>
      <div className="group space-y-6">
        {enabled && (
          <div className="absolute right-4 z-20 invisible group-hover:visible">
            <DropdownAction
              actionMenu={actionMenu}
              recordId={organization.id}
            />
          </div>
        )}
        <div className="">
          {openToast && <Toast title={toastData.title} type={toastData.type} />}
          <div className={`flex space-x-4 ${enabled && '-mt-6'}`}>
            <div className="relative">
              <Avatar
                size="md"
                icon={<BuildingOfficeIcon className="text-serene-600" />}
                src={
                  image || (organization.img && API_BASE_URL + organization.img)
                }
                title={organization.name}
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
              <h1 className="font-medium">{organization.name}</h1>
              <p className="text-gray-500 text-[11px]">
                {organization.industry?.name}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <EnvelopeIcon width="16" height="16" className="text-gray-700" />
            <div className="text-gray-700 text-xs">{organization.email}</div>
          </div>
          <div className="flex items-center space-x-2">
            <PhoneIcon width="16" height="16" className="text-gray-700" />
            <div className="text-gray-700 text-xs">{organization.phone}</div>
          </div>
          <div className="flex items-center space-x-2">
            <MapPinIcon width="16" height="16" className="text-gray-700" />
            <div className="text-gray-700 text-xs">
              {organization.street}, {organization.province},{' '}
              {organization.country?.name}
            </div>
          </div>
          {organization.leads &&
            organization.opportunities &&
            organization.quotes && (
              <div className="flex items-center justify-center space-x-8 pt-4 border-t border-t-gray-200 font-medium text-serene-700">
                <TertiaryButton disabled={editable}>
                  <Square3Stack3DIcon width="16" height="16" />
                  <span>{organization.leads?.length} Leads</span>
                </TertiaryButton>
                <TertiaryButton disabled={editable}>
                  <TrophyIcon width="16" height="16" />
                  <span>
                    {organization.opportunities?.length} Opportunities
                  </span>
                </TertiaryButton>
                <TertiaryButton disabled={editable}>
                  <ReceiptPercentIcon width="16" height="16" />
                  <span>{organization.quotes?.length} Quotes</span>
                </TertiaryButton>
              </div>
            )}
        </div>
        <div className="flex items-center absolute bottom-16 right-4 -space-x-2">
          {organization.individuals?.map((item: any) => (
            <Avatar
              key={item.id}
              icon={<div>{item.name[0]}</div>}
              src={item.img && API_BASE_URL + item.img}
              title={item.name}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
