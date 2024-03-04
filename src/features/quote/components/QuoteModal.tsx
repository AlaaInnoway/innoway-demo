import { useEffect, useState } from 'react';
import {
  CheckIcon,
  PlusCircleIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Input from '../../../components/form/Input';
import Modal from '../../../components/ui/Modal';
import useCreateRecord from '../../../hooks/useCreateRecord';
import fetchDataByModel from '../../../utils/fetch';
import fetchFilterData from '../../../services/filter.service';
import Select from '../../../components/form/Select';
import Table from '../../../components/ui/Table';
import { IconButton } from '../../../components/ui/Button';

interface Props {
  data: any;
  open: boolean;
  onSave?: () => void;
}

export default function QuoteModal(props: Props) {
  const { data, open, onSave } = props;
  const [openModal, setOpenModal] = useState(open);
  const [newLineEnabled, setNewLineEnabled] = useState(false);
  const [products, setProducts] = useState(new Array(0));
  const [items, setItems] = useState(new Array(0));

  const handleDataUpdate = () => {
    // get products
    fetchDataByModel('product', ['id', 'name', 'price']).then((result) => {
      setProducts(result?.records);
    });
  };

  const queryKey = 'filterData';
  const { createRecord } = useCreateRecord(queryKey);

  const [recordData, setRecordData] = useState<{
    [key: string]: any; // This allows any string key with any value type
  }>({
    name: '',
    opportunity: {
      connect: {
        id: data.id,
      },
    },
    user: {
      connect: {
        id: data.user?.id,
      },
    },
    stage: {
      connect: {
        id: 0,
      },
    },
    subStage: {
      connect: {
        id: 0,
      },
    },
    totalAmount: 0,
    salesTeam: data.salesTeam,
    validityPeriod: 0,
    expiredAt: '',
    items: [],
  });
  const [stages, setStages] = useState(new Array(0));

  const [newProduct, setNewProduct] = useState<{
    [key: string]: any; // This allows any string key with any value type
  }>({
    product: {
      id: 0,
      price: 0,
    },
    quantity: 1,
    subTotal: 0,
  });

  useEffect(() => {
    handleDataUpdate();
    // get stages
    fetchDataByModel(
      'stage',
      ['id', 'name', 'children'],
      [
        {
          logicalOperator: 'AND',
          conditions: [
            {
              field: 'parentId',
              operator: 'equals',
              values: null,
            },
            {
              field: 'workflow.modelName',
              operator: 'equals',
              values: 'Quote',
            },
          ],
        },
      ]
    ).then((result: any) => {
      setStages(result?.records);
    });
  }, []);
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setRecordData({
      ...recordData,
      [name]: value,
    });
  };

  const handleInputProductChange = (e: {
    target: { name: any; value: any };
  }) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
      subTotal: value * newProduct.product.price,
    });
  };

  const handleSelectChange = (item: any, name: string) => {
    setNewProduct({
      ...newProduct,
      [name]: item,
      subTotal: newProduct.quantity * item.price,
    });
  };

  const retrieveLastQuote = async () => {
    return fetchFilterData({
      modelName: 'Quote',
      filters: [],
      selectFields: ['id'],
      sortField: 'id',
      sortOrder: 'desc',
      page: 1,
      perPage: 1,
      groupByField: undefined,
      groupByAggregates: [],
      aggregates: [],
    });
  };

  const handleCreate = async () => {
    try {
      retrieveLastQuote().then(async (quotes) => {
        // initiate expired date, validity period & stage before saving
        const quoteId = quotes?.records[0]?.id || 1; // Use optional chaining to safely access the ID
        const quoteName = `Q${quoteId.toString().padStart(5, '0')}`;

        // Create an array of item objects to add to the new quote
        const newItems: {
          product: { connect: { id: number } };
          quantity: number;
          subTotal: any;
        }[] = [];
        let totalAmount = 0;
        items.forEach((item) => {
          // calculate totalAmount
          totalAmount += item.subTotal;
          newItems.push({
            product: { connect: { id: item.product.id } },
            quantity: parseInt(item.quantity, 10),
            subTotal: item.subTotal,
          });
        });

        let newRecordData: any = {
          ...recordData,
          name: quoteName,
          validityPeriod: parseInt(recordData.validityPeriod, 10) || 0,
          expiredAt: new Date(
            new Date().setDate(
              new Date().getDate() + parseInt(recordData.validityPeriod, 10) ||
                0
            )
          ),
          totalAmount,
          stage: {
            connect: {
              id: stages[0].id,
            },
          },
          subStage: {
            connect: {
              id: stages[0].children.length
                ? stages[0].children.sort(
                    (a: any, b: any) => a.sequence - b.sequence
                  )[0].id
                : stages[0].id,
            },
          },
          items: {
            create: newItems, // Use Prisma create syntax to create associated items
          },
        };
        // fill contact with the appropriate model (organization or individual) before saving
        if (data.organization)
          newRecordData = {
            ...newRecordData,
            organization: {
              connect: {
                id: data.organization?.id,
              },
            },
          };
        if (data.individual)
          newRecordData = {
            ...newRecordData,
            individual: {
              connect: {
                id: data.individual?.id,
              },
            },
          };
        await createRecord({
          modelName: 'Quote',
          data: newRecordData,
        }).then((newRecord: any) => {
          // update logs
          createRecord({
            modelName: 'Log',
            data: {
              content: "Quote was created successfully",
              userId: parseInt(localStorage.getItem('loggedInUserId') || '', 10),
              modelName: "Quote",
              recordId: newRecord.id
            },
          });
        });
        setOpenModal(!openModal);
        // update stage and substage
        if (onSave) onSave();
        setRecordData({
          name: '',
          opportunity: {
            connect: {
              id: data.id,
            },
          },
          user: {
            connect: {
              id: data.user?.id,
            },
          },
          stage: {
            connect: {
              id: 0,
            },
          },
          subStage: {
            connect: {
              id: 0,
            },
          },
          totalAmount: 0,
          salesTeam: data.salesTeam,
          validityPeriod: 0,
          expiredAt: '',
          items: [],
        });
      });
    } catch (error) {
      console.error('Error creating record:', error);
      // Handle error
    }
  };
  const columns = [
    {
      id: 'name',
      name: 'Name',
      sequence: 1,
    },
    {
      id: 'quantity',
      name: 'Quantity',
      sequence: 2,
    },
    {
      id: 'price',
      name: 'Unit Price	',
      sequence: 3,
    },
    {
      id: 'subtotal',
      name: 'Subtotal',
      sequence: 4,
    },
  ];

  const handleSaveChanges = () => {
    setNewLineEnabled(false);
    setItems([...items, newProduct]);
    // reset the new product data
    setNewProduct({
      product: {
        id: 0,
        price: 0,
      },
      quantity: 1,
      subTotal: 0,
    });
  };

  const handleDiscardChanges = () => {
    setNewLineEnabled(false);
    // reset the new product data
    setNewProduct({
      product: {
        id: 0,
        price: 0,
      },
      quantity: 1,
      subTotal: 0,
    });
  };

  const handleRemoveProduct = (productToRemove: any) => {
    setNewLineEnabled(false);
    const updatedItems = items.filter((item) => item !== productToRemove);
    setItems(updatedItems);
  };

  return (
    openModal && (
      <Modal
        title="New Quote"
        open={openModal}
        onDiscard={() => setOpenModal(!openModal)}
        onSave={handleCreate}
      >
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <Input
              disabled
              label="Contact"
              name="contact"
              value={data.organization?.name || data.individual?.name}
              handleChange={() => null}
            />
          </div>
          <div className="col-span-1">
            <Input
              disabled
              label="Opportunity"
              name="opportunity"
              value={data.name}
              handleChange={() => null}
            />
          </div>
          <div className="col-span-1">
            <Input
              disabled
              label="Salesperson"
              name="user"
              value={data.user?.name}
              handleChange={() => null}
            />
          </div>
          <div className="col-span-1">
            <Input
              label="Validity Period"
              name="validityPeriod"
              value={recordData.validityPeriod}
              handleChange={handleInputChange}
            />
          </div>
          <div className="col-span-1">
            <Input
              disabled
              label="Created Date"
              name="createdAt"
              value={new Date().toLocaleDateString()}
              handleChange={() => null}
            />
          </div>
          <div className="col-span-1">
            <Input
              disabled
              label="Expired Date"
              name="expiredAt"
              value={new Date(
                new Date().setDate(
                  new Date().getDate() +
                    parseInt(recordData.validityPeriod, 10) || 0
                )
              ).toLocaleDateString()}
              handleChange={() => null}
            />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <h1>Products</h1>
          <IconButton
            onClick={() => setNewLineEnabled(true)}
            customClass="group"
          >
            <PlusCircleIcon
              width={16}
              height={16}
              className="stroke-serene-500 group-hover:stroke-gray-900"
            />
            <span className="text-xs text-serene-500 group-hover:text-gray-900">
              Add product
            </span>
          </IconButton>
        </div>
        <Table
          columns={columns}
          optionalColumns={[]}
          handleColumnChange={() => null}
        >
          {items.map((item: any, index: number) => (
            <tr
              className={`group hover:bg-serene-50 ${
                index + 1 !== items.length && 'border-b border-b-gray-200'
              }`}
              key={item.id}
            >
              <td className="py-4 px-6">{index + 1}</td>
              <td className="py-4 px-6">{item.product?.name}</td>
              <td className="py-4 px-6">{item.quantity}</td>
              <td className="py-4 px-6">{item.product?.price}</td>
              <td className="py-4 px-6">$ {item.subTotal}</td>
              <td className="py-4 px-6">
                <IconButton onClick={() => handleRemoveProduct(item)}>
                  <TrashIcon
                    width={20}
                    height={20}
                    className="stroke-serene-500 hover:stroke-gray-900"
                    title="Remove"
                  />
                </IconButton>
              </td>
            </tr>
          ))}
          {newLineEnabled && (
            <tr className="group border-t border-t-gray-200 hover:bg-serene-50">
              <td className="py-4 px-6">{items.length + 1}</td>
              <td className="py-4 px-6">
                <Select
                  items={products}
                  value={
                    products.filter((item) => {
                      return item.id === newProduct?.product?.id;
                    })[0]
                  }
                  handleChange={(item: any) =>
                    handleSelectChange(item, 'product')
                  }
                />
              </td>
              <td className="py-4 px-6">
                <Input
                  name="quantity"
                  value={newProduct?.quantity}
                  handleChange={handleInputProductChange}
                  type="number"
                />
              </td>
              <td className="py-4 px-6">$ {newProduct?.product?.price || 0}</td>
              <td className="py-4 px-6">$ {newProduct?.subTotal || 0}</td>
              <td className="py-4 px-6">
                <div className="flex items-center space-x-2">
                  <IconButton onClick={handleSaveChanges}>
                    <CheckIcon
                      width={20}
                      height={20}
                      className="stroke-serene-500 hover:stroke-gray-900"
                      title="Save Changes"
                    />
                  </IconButton>
                  <IconButton onClick={handleDiscardChanges}>
                    <XMarkIcon
                      width={20}
                      height={20}
                      className="stroke-serene-500 hover:stroke-gray-900"
                      title="Discard Changes"
                    />
                  </IconButton>
                </div>
              </td>
            </tr>
          )}
        </Table>
      </Modal>
    )
  );
}
