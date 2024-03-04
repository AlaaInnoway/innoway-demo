import { useState } from 'react';
import {
  AdjustmentsVerticalIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline';
import ControlPanel from '../../layout/ControlPanel';
import Container from '../../layout/Container';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Select from '../../components/form/Select';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import { IconButton } from '../../components/ui/Button';

export default function EmailBox() {
  const [open, setOpen] = useState(localStorage.getItem('open') === 'true');

  const breadcrumbs = [
    {
      name: 'Emails',
      path: '/emails',
    },
  ];

  const columns = [
    {
      id: 'date',
      name: 'Date',
      sequence: 1,
    },
    {
      id: 'sender',
      name: 'Sender',
      sequence: 2,
    },
    {
      id: 'subject',
      name: 'Subject',
      sequence: 3,
    },
  ];

  return (
    <Container>
      <ControlPanel>
        <Breadcrumb items={breadcrumbs} />
        <div className="flex items-center space-x-4" />
      </ControlPanel>
      <ControlPanel>
        <div className="flex items-center space-x-4">
          <Select
            openMaxWidth
            customClass="bg-white space-x-2"
            items={[
              { id: 1, name: 'CRM' },
              { id: 2, name: 'Mail' },
              { id: 3, name: 'Storage' },
            ]}
            value={{ id: 0, name: 'Category' }}
            handleChange={() => null}
          />
          <Select
            openMaxWidth
            customClass="bg-white space-x-2"
            items={[
              { id: 1, name: 'Enabled' },
              { id: 2, name: 'Disabled' },
            ]}
            value={{ id: 0, name: 'Status' }}
            handleChange={() => null}
          />
          <Select
            openMaxWidth
            customClass="bg-white space-x-2"
            items={[{ id: 1, name: 'Name' }]}
            value={{ id: 0, name: 'More' }}
            handleChange={() => null}
            icon={<AdjustmentsVerticalIcon width={14} height={14} />}
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-0">
            <div className="text-[10px] font-medium text-gray-500">
              Sort By :{' '}
            </div>
            <Select
              openMaxWidth
              openFromRight
              customClass="border-0 font-medium text-gray-700 space-x-2"
              items={[
                { id: 0, name: 'Recent' },
                { id: 1, name: 'Name' },
                { id: 2, name: 'Category' },
                { id: 3, name: 'Status' },
              ]}
              value={{ id: 1, name: 'Recent' }}
              handleChange={() => null}
            />
          </div>
        </div>
      </ControlPanel>

      <Card>
        <div className="space-y-2">
          <Table
            columns={columns}
            optionalColumns={[]}
            handleColumnChange={() => null}
          >
            <tr className="group hover:bg-serene-50 border-b border-b-gray-200">
              <td className="py-4 px-6">1</td>
              <td className="py-4 px-6">10/11/2023</td>
              <td className="py-4 px-6">AIPRM</td>
              <td className="py-4 px-6">
                Ready to Unleash Your Creativity With AIPRM’s ChatGPT
                Prompts?
              </td>
              <td className="py-4 px-6">
                <IconButton onClick={() => null}>
                  <BookmarkIcon
                    width={16}
                    height={16}
                    title="Mark as lead"
                    className="text-serene-400 hover:fill-serene-400 hover:stroke-none"
                  />
                </IconButton>
              </td>
            </tr>
            <tr className="group hover:bg-serene-50 border-b border-b-gray-200">
              <td className="py-4 px-6">1</td>
              <td className="py-4 px-6">10/11/2023</td>
              <td className="py-4 px-6">Houcem Eddine Kachbouri</td>
              <td className="py-4 px-6">
                Ready to Unleash Your Creativity With AIPRM’s ChatGPT
                Prompts?
              </td>
              <td className="py-4 px-6">
                <IconButton onClick={() => null}>
                  <BookmarkIcon
                    width={16}
                    height={16}
                    title="Mark as lead"
                    className="fill-serene-400 stroke-none"
                  />
                </IconButton>
              </td>
            </tr>
            <tr className="group hover:bg-serene-50 border-b border-b-gray-200">
              <td className="py-4 px-6">1</td>
              <td className="py-4 px-6">10/11/2023</td>
              <td className="py-4 px-6">AIPRM</td>
              <td className="py-4 px-6">
                Ready to Unleash Your Creativity With AIPRM’s ChatGPT
                Prompts?
              </td>
              <td className="py-4 px-6">
                <IconButton onClick={() => null}>
                  <BookmarkIcon
                    width={16}
                    height={16}
                    title="Mark as lead"
                    className="text-serene-400 hover:fill-serene-400 hover:stroke-none"
                  />
                </IconButton>
              </td>
            </tr>
          </Table>
        </div>
      </Card>
    </Container>
  );
}
