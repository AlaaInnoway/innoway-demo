import {
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Input from '../../../components/form/Input';
import { IconButton } from '../../../components/ui/Button';
import { ListItem, ListNewItem } from '../../../interfaces/list-item.interface';
import Select from '../../../components/form/Select';
import { stringToDate } from '../../../utils/formatDate';

export function NewExperienceItem(props: ListNewItem) {
  const {
    newItem,
    editable,
    config,
    onChangeField,
    onChangeSelect,
    onDiscard,
    onSave,
  } = props;
  return (
    <tr className="group border-t border-t-gray-200 hover:bg-serene-50">
      <td className="py-4 px-6">-</td>
      <td className="py-4 px-6">
        <Input
          name="company"
          value={newItem?.company}
          handleChange={onChangeField}
        />
      </td>
      <td className="py-4 px-6">
        <Select
          items={config.jobTitles}
          value={
            config.jobTitles.filter((jobTitle: any) => {
              return (
                jobTitle.id === newItem?.jobTitle?.connect?.id ||
                jobTitle.id === newItem?.jobTitleId
              );
            })[0]
          }
          handleChange={(item: any) => onChangeSelect(item, 'jobTitle')}
        />
      </td>
      <td className="py-4 px-6">
        <Input
          type="date"
          name="startDate"
          value={newItem?.startDate && stringToDate(newItem?.startDate)}
          handleChange={onChangeField}
        />
      </td>
      <td className="py-4 px-6">
        <Input
          type="date"
          name="endDate"
          value={newItem?.endDate && stringToDate(newItem?.endDate)}
          handleChange={onChangeField}
        />
      </td>
      <td className="py-4 px-6 opacity-0 group-hover:opacity-100">
        <div className="flex items-center space-x-2">
          <IconButton disabled={editable} onClick={onSave}>
            <CheckIcon
              width={16}
              height={16}
              className="stroke-serene-500 hover:stroke-gray-900"
              title="Save Changes"
            />
          </IconButton>
          <IconButton disabled={editable} onClick={onDiscard}>
            <XMarkIcon
              width={16}
              height={16}
              className="stroke-serene-500 hover:stroke-gray-900"
              title="Discard Changes"
            />
          </IconButton>
        </div>
      </td>
    </tr>
  );
}

export function ExperienceItem(props: ListItem) {
  const {
    index,
    item,
    editedItem,
    count,
    editable,
    config,
    onEdit,
    onSaveEdit,
    onCancelEdit,
    onDelete,
    onChangeField,
    onChangeSelect,
  } = props;

  const isEdited = editedItem?.id === item.id;
  const cellClassName = isEdited ? 'py-4' : 'py-0';

  return (
    <tr
      className={`group hover:bg-serene-50 ${
        index !== count && 'border-b border-b-gray-200'
      }`}
      key={item.id}
    >
      <td className="py-4 px-6">{index}</td>
      <td className={`${cellClassName} px-6`}>
        <Input
          disabled={!isEdited}
          name="company"
          value={item?.company}
          handleChange={onChangeField}
        />
      </td>
      <td className={`${cellClassName} px-6`}>
        <Select
          disabled={!isEdited}
          items={config.jobTitles}
          value={
            config.jobTitles.filter((jobTitle: any) => {
              return (
                jobTitle.id === item?.jobTitle?.connect?.id ||
                jobTitle.id === item?.jobTitle?.id ||
                jobTitle.id === item?.jobTitleId
              );
            })[0]
          }
          handleChange={(jobTitle: any) => onChangeSelect(jobTitle, 'jobTitle')}
        />
      </td>
      <td className={`${cellClassName} px-6`}>
        <Input
          disabled={!isEdited}
          type="date"
          name="startDate"
          value={stringToDate(item?.startDate)}
          handleChange={onChangeField}
        />
      </td>
      <td className={`${cellClassName} px-6`}>
        <Input
          disabled={!isEdited}
          type="date"
          name="endDate"
          value={stringToDate(item?.endDate)}
          handleChange={onChangeField}
        />
      </td>
      <td className="py-4 px-6 opacity-0 group-hover:opacity-100">
        {isEdited ? (
          <div className="flex items-center space-x-2">
            <IconButton disabled={editable} onClick={onSaveEdit}>
              <CheckIcon
                width={16}
                height={16}
                className="stroke-serene-500 hover:stroke-gray-900"
                title="Save Changes"
              />
            </IconButton>
            <IconButton disabled={editable} onClick={onCancelEdit}>
              <XMarkIcon
                width={16}
                height={16}
                className="stroke-serene-500 hover:stroke-gray-900"
                title="Cancel Edit"
              />
            </IconButton>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <IconButton
              disabled={editable || isEdited}
              onClick={() => onEdit(item)}
            >
              <PencilSquareIcon
                width={16}
                height={16}
                className="stroke-serene-500 hover:stroke-gray-900"
                title="Edit"
              />
            </IconButton>
            <IconButton
              disabled={editable || isEdited}
              onClick={() => onDelete(item.id)}
            >
              <TrashIcon
                width={16}
                height={16}
                className="stroke-serene-500 hover:stroke-gray-900"
                title="Remove"
              />
            </IconButton>
          </div>
        )}
      </td>
    </tr>
  );
}
