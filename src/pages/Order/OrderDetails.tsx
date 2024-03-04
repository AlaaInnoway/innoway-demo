/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useMemo, useState } from 'react';
import {
  CheckCircleIcon,
  CheckIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  PrinterIcon,
  TrashIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useLocation, useParams } from 'react-router-dom';
import Container from '../../layout/Container';
import ControlPanel from '../../layout/ControlPanel';
import {
  IconButton,
  PrimaryButton,
  SecondaryButton,
} from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/form/Input';
import { Tab, TabPanel } from '../../components/ui/Tab';
import IndividualCard from '../../features/contact/components/IndividualCard';
import Breadcrumb from '../../components/ui/Breadcrumb';
import useSearchData from '../../hooks/useSearchData';
import { SearchRequest } from '../../interfaces/search-request.interface';
import useUpdateRecord from '../../hooks/useUpdateRecord';
import Toast from '../../components/ui/Toast';
import Dialog from '../../components/ui/Dialog';
import NotePanel from '../../features/note/components/NotePanel';
import TaskPanel from '../../features/task/components/TaskPanel';
import LogPanel from '../../features/log/components/LogPanel';
import DocumentPanel from '../../features/documents/components/DocumentPanel';
import { orderFields } from '../../features/quote/data/fields';
import fetchDataByModel from '../../utils/fetch';
import { getAndUpdateDashboardItems } from '../../services/dashboard-items.service';
import OrganizationCard from '../../features/contact/components/OrganizationCard';
import Stepper from '../../components/ui/Stepper';
import Paginator from '../../components/ui/Paginator';
import Table from '../../components/ui/Table';
import Select from '../../components/form/Select';
import fetchFilterData from '../../services/filter.service';
import useCreateRecord from '../../hooks/useCreateRecord';

export default function OrderDetails() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastData, setToastData] = useState({ title: '', type: '' });
  // Retrieve the 'edit' parameter and check its value
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const edit = queryParams.get('edit');
  const [editable, setEditable] = useState(edit === 'true');
  const [newLineEnabled, setNewLineEnabled] = useState(false);
  const [products, setProducts] = useState(new Array(0));
  const [items, setItems] = useState(new Array(0));
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

  const [activeIndex, setActiveIndex] = useState(
    parseInt(queryParams.get('active_tab') || '0', 10)
  );
  const { id } = useParams();
  const breadcrumbs = useMemo(
    () => [
      {
        name: 'Orders',
        path: '/sales/order',
      },
    ],
    []
  );

  const filterData: SearchRequest = {
    modelName: 'Order',
    recordId: id || '',
    selectFields: [
      'id',
      'name',
      'organization.id',
      'organization.img',
      'organization.name',
      'organization.type',
      'organization.email',
      'organization.phone',
      'organization.industry',
      'organization.street',
      'organization.city',
      'organization.province',
      'organization.country',
      'individual.id',
      'individual.img',
      'individual.name',
      'individual.type',
      'individual.jobTitle',
      'individual.organization',
      'individual.email',
      'individual.phone',
      'individual.street',
      'individual.city',
      'individual.province',
      'individual.country',
      'opportunity.id',
      'opportunity.name',
      'totalAmount',
      'createdAt',
      'validityPeriod',
      'expiredAt',
      'user.id',
      'user.name',
      'salesTeam',
      'stage',
      'subStage',
      'items.id',
      'items.product',
      'items.quantity',
      'items.subTotal',
    ],
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading } = useSearchData(filterData);
  const [initialData, setInitialData] = useState(data);
  const [recordData, setRecordData] = useState(initialData);
  const [updatedFields, setUpdatedFields] = useState({});

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setRecordData({
      ...recordData,
      [name]: value,
    });
    if (value !== initialData[name]) {
      // check if the input is filled and required or the field is not required, in this case update changes
      if (
        (value && orderFields[name].required) ||
        !orderFields[name].required
      ) {
        setUpdatedFields({
          ...updatedFields,
          [name]: value,
        });
      }
    }
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

  const queryKey = 'searchData';
  const updateRecord = useUpdateRecord(queryKey); // Use the custom hook
  const { createRecord } = useCreateRecord(queryKey);

  const handleUpdateProducts = async (items: any[]) => {
    try {
      let updatedFieldsCopy: Record<string, any> = { ...updatedFields };
      console.log('recordData.items');
      console.log(items);
      console.log(recordData.items);

      let totalAmount = 0;
      items.forEach((item) => {
        // calculate totalAmount
        totalAmount += item.subTotal;
      });
      console.log('totalAmount');
      console.log(totalAmount);

      // Check for added or removed order items
      const addedItems = items.filter(
        (item) =>
          !recordData.items.some(
            (existingItem: any) => existingItem.id === item.id
          )
      );
      const removedItems = recordData.items.filter(
        (existingItem: any) =>
          !items.some((item) => item.id === existingItem.id)
      );

      // Create an array of order item objects to add to the updated order
      const addedOrderItems = addedItems.map((item) => ({
        product: { connect: { id: item.product.id } },
        quantity: parseInt(item.quantity, 10),
        subTotal: item.subTotal,
      }));

      // Create an array of order item IDs to remove from the updated order
      const removedOrderItemIds = removedItems.map((item: any) => item.id);
      updatedFieldsCopy = {
        ...updatedFieldsCopy,
        totalAmount,
        items: {
          create: addedOrderItems, // Add newly added items
          deleteMany: { id: { in: removedOrderItemIds } }, // Remove removed items
        },
      };
      console.log('addedOrderItems');
      console.log(addedOrderItems);
      console.log('removedOrderItemIds');
      console.log(removedOrderItemIds);
      setUpdatedFields(updatedFieldsCopy);
      // Call the mutate function to update the record
      await updateRecord.mutateAsync({
        modelName: 'Order', // Model name
        recordId: recordData.id, // Record ID
        updates: updatedFieldsCopy, // Update data
      });
      setOpenToast(!openToast);
      // Handle toast success or further actions
      setToastData({
        title: 'Changes have been saved successfully',
        type: 'success',
      });
      setUpdatedFields({});
      setInitialData(recordData);
      // get dashboards by modelName & update them
      getAndUpdateDashboardItems('order');
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  const handleUpdate = async () => {
    // Check if all required fields are filled
    const requiredFields = Object.keys(orderFields).filter(
      (fieldName) => orderFields[fieldName].required
    );

    const areAllRequiredFieldsFilled = requiredFields.every(
      (fieldName) => recordData[fieldName]
    );

    if (!areAllRequiredFieldsFilled) {
      // Display an error message or handle the case where required fields are not filled
      setOpenToast(!openToast);
      setToastData({
        title: 'Please fill in all required fields',
        type: 'warning',
      });
      return;
    }
    if (Object.keys(updatedFields).length !== 0) {
      try {
        let updatedFieldsCopy: Record<string, any> = { ...updatedFields };
        if (updatedFieldsCopy.validityPeriod) {
          updatedFieldsCopy = {
            ...updatedFieldsCopy,
            validityPeriod: parseInt(recordData.validityPeriod, 10),
            expiredAt: new Date(
              new Date(
                new Date().setDate(
                  new Date(recordData?.createdAt).getDate() +
                    parseInt(recordData?.validityPeriod, 10) || 0
                )
              )
            ),
          };
        }
        console.log('updatedFieldsCopy');
        console.log(updatedFieldsCopy);

        setUpdatedFields(updatedFieldsCopy);
        // Call the mutate function to update the record
        await updateRecord.mutateAsync({
          modelName: 'Order', // Model name
          recordId: recordData.id, // Record ID
          updates: updatedFieldsCopy, // Update data
        });
        setOpenToast(!openToast);
        // Handle toast success or further actions
        setToastData({
          title: 'Changes have been saved successfully',
          type: 'success',
        });
        setEditable(!editable);
        setUpdatedFields({});
        setInitialData(recordData);
        // get dashboards by modelName & update them
        getAndUpdateDashboardItems('order');
      } catch (error) {
        console.error('Error updating record:', error);
      }
    } else {
      setEditable(!editable);
      setOpenToast(!openToast);
      // Handle toast info or further actions
      setToastData({
        title: 'No changes have been made that need to be saved',
        type: 'info',
      });
    }
  };

  const handleOpenDialog = () => {
    if (Object.keys(updatedFields).length !== 0) setOpenDialog(!openDialog);
    else setEditable(!editable);
  };

  const handleDiscard = () => {
    setRecordData(initialData);
    setEditable(!editable);
    setOpenDialog(!openDialog);
    setUpdatedFields({});
    setOpenToast(!openToast);
    // Handle toast info or further actions
    setToastData({
      title: 'Changes made have been discarded',
      type: 'info',
    });
  };
  const [stages, setStages] = useState(new Array(0));
  const [invoiceStages, setInvoiceStages] = useState(new Array(0));

  const [currentStage, setCurrenStage] = useState(stages[0]);
  const [currentSubStage, setCurrenSubStage] = useState(stages[0]);

  const retrieveInvoiceStages = async () => {
    // get invoice stages
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
              values: 'Invoice',
            },
          ],
        },
      ]
    ).then((result: any) => {
      setInvoiceStages(result?.records);
    });
  };

  const handleDataUpdate = () => {
    // get products
    fetchDataByModel('product', ['id', 'name', 'description', 'price']).then(
      (result) => {
        setProducts(result?.records);
      }
    );
    // get stages
    fetchDataByModel(
      'stage',
      [
        'id',
        'name',
        'sequence',
        'description',
        'actionName',
        'actionTypeId',
        'color',
        'children',
      ],
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
              values: 'Order',
            },
          ],
        },
      ]
    ).then((result) => {
      // order children by sequence
      result?.records.map((stage: any) => {
        if (stage.children) {
          stage.children.sort((a: any, b: any) => a.sequence - b.sequence);
        }
        return 0;
      });

      setStages(result?.records);
      if (data?.stage?.id) {
        // set current stage and substage
        const stageIndex = result?.records.findIndex(
          (stage: any) => stage.id === data?.stage?.id
        );
        setCurrenStage(result?.records[stageIndex]);
        setCurrenSubStage(
          result?.records[stageIndex]?.children
            ? result?.records[stageIndex].children[
                result?.records[stageIndex].children.findIndex(
                  (child: any) => child.id === data?.subStage?.id
                )
              ]
            : undefined
        );
      }
    });

    // get invoice stages
    retrieveInvoiceStages();
    // Check if data is valid and id is available
    if (data && id) {
      setInitialData(data);
      setRecordData(data);
      setItems(data.items);
    }
  };

  useEffect(() => {
    handleDataUpdate();
    // Update breadcrumb
    if (data?.name && breadcrumbs.length === 1) {
      breadcrumbs.push({
        name: data.name,
        path: `/sales/order/${id}`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, id]);

  const handleCurrentStage = (offset: number) => {
    if (currentStage.children && currentSubStage) {
      if (currentSubStage?.sequence < currentStage.children?.length) {
        const updatedStage = currentStage.children[
          currentStage.children.findIndex(
            (stage: any) => stage.id === currentSubStage.id
          ) + offset
        ];
        setCurrenSubStage(updatedStage);
        // update logs
        createRecord({
          modelName: 'Log',
          data: {
            stageFromValue: currentSubStage?.name,
            stageFromColor: currentSubStage?.color,
            stageToValue: updatedStage?.name,
            stageToColor: updatedStage?.color,
            userId: parseInt(localStorage.getItem('loggedInUserId') || '', 10),
            modelName: "Order",
            recordId: parseInt(id || '0'),
          },
        });
      } else {
        const updatedStage =
          stages[
            stages.findIndex((stage) => stage.id === currentStage.id) + offset
          ];
        setCurrenStage(updatedStage);
        setCurrenSubStage(
          updatedStage.children ? updatedStage.children[0] : undefined
        );
        // update logs
        createRecord({
          modelName: 'Log',
          data: {
            stageFromValue: currentStage?.name,
            stageFromColor: currentStage?.color,
            stageToValue: updatedStage?.name,
            stageToColor: updatedStage?.color,
            userId: parseInt(localStorage.getItem('loggedInUserId') || '', 10),
            modelName: "Order",
            recordId: parseInt(id || '0'),
          },
        });
      }
    } else {
      const updatedStage = stages[stages.findIndex((stage) => stage.id === currentStage.id)+1];
      setCurrenStage(updatedStage);
      // update logs
      createRecord({
        modelName: 'Log',
        data: {
          stageFromValue: currentStage?.name,
          stageFromColor: currentStage?.color,
          stageToValue: updatedStage?.name,
          stageToColor: updatedStage?.color,
          userId: parseInt(localStorage.getItem('loggedInUserId') || '', 10),
          modelName: "Order",
          recordId: parseInt(id || '0'),
        },
      });
    }
  };

  const getUpdatedStage = (offset: number) => {
    if (currentStage.children && currentSubStage)
      if (currentSubStage?.sequence < currentStage.children?.length)
        return stages[
          stages.findIndex((stage) => stage.id === currentStage.id)
        ];
      else
        return stages[
          stages.findIndex((stage) => stage.id === currentStage.id) + offset
        ];
    return stages[
      stages.findIndex((stage) => stage.id === currentStage.id) + offset
    ];
  };

  const getUpdatedSubStage = (offset: number) => {
    if (currentSubStage?.sequence < currentStage.children?.length)
      return currentStage.children[
        currentStage.children.findIndex(
          (stage: any) => stage.id === currentSubStage.id
        ) + offset
      ];
    const updatedStage =
      stages[
        stages.findIndex((stage) => stage.id === currentStage.id) + offset
      ];
    return updatedStage.children ? updatedStage.children[0] : undefined;
  };

  const retrieveLastInvoice = async () => {
    return fetchFilterData({
      modelName: 'Invoice',
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

  const handleInvoiceGeneration = async () => {
    console.log('currentStage?.actionTypeId');
    console.log(currentSubStage?.actionTypeId);
    console.log(currentStage?.actionTypeId);
    if (
      currentSubStage?.actionTypeId === 3 ||
      currentStage?.actionTypeId === 3
    ) {
      // Generate new invoice;
      console.log('Generate new invoice');
      try {
        retrieveLastInvoice().then(async (invoices) => {
          const invoiceId = invoices?.records[0]?.id || 1; // Use optional chaining to safely access the ID
          const invoiceName = `INV${invoiceId.toString().padStart(5, '0')}`;

          // Create an array of item objects to add to the new invoice
          const newItems: {
            product: { connect: { id: number } };
            quantity: number;
            subTotal: any;
          }[] = [];
          recordData.items.forEach((item: any) => {
            newItems.push({
              product: { connect: { id: item.product.id } },
              quantity: parseInt(item.quantity, 10),
              subTotal: item.subTotal,
            });
          });

          let newRecordData: any = {
            name: invoiceName,
            opportunity: {
              connect: {
                id: recordData.opportunity?.id,
              },
            },
            user: {
              connect: {
                id: recordData.user?.id,
              },
            },
            totalAmount: recordData.totalAmount,
            salesTeam: recordData.salesTeam,
            validityPeriod: recordData.validityPeriod,
            expiredAt: recordData.expiredAt,
            stage: {
              connect: {
                id: invoiceStages[0].id,
              },
            },
            subStage: {
              connect: {
                id: invoiceStages[0].children.length
                  ? invoiceStages[0].children.sort(
                      (a: any, b: any) => a.sequence - b.sequence
                    )[0].id
                  : invoiceStages[0].id,
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
            modelName: 'Invoice',
            data: newRecordData,
          }).then((newRecord: any) => {
            // update logs
            createRecord({
              modelName: 'Log',
              data: {
                content: "Invoice was created successfully",
                userId: parseInt(localStorage.getItem('loggedInUserId') || '', 10),
                modelName: "Invoice",
                recordId: newRecord.id
              },
            });
          });
          // get dashboards by modelName & update them
          getAndUpdateDashboardItems('invoice');
        });
      } catch (error) {
        console.error('Error creating record:', error);
        // Handle error
      }
    }
  };

  const handleUpdateStage = async (offset: number) => {
    try {
      // verify if the action is Invoice Generation then generate new invoice based on order data
      handleInvoiceGeneration();
      // Call the mutate function to update the record
      handleCurrentStage(offset);
      // retreive the new stage to use in the update function
      const newStage = getUpdatedStage(offset);
      const newSubStage = getUpdatedSubStage(offset);
      setCurrenStage(newStage);
      setCurrenSubStage(newSubStage);
      let updates = {};
      if (newStage)
        updates = {
          ...updates,
          stageId: newStage.id,
        };
      if (newSubStage) {
        updates = {
          ...updates,
          subStageId: newSubStage.id,
        };
        setToastData({
          title: `Order is now at ${newSubStage?.name} stage`,
          type: 'info',
        });
      } else {
        updates = {
          ...updates,
          subStageId: null,
        };
        setToastData({
          title: `Order is now at ${newStage?.name} stage`,
          type: 'info',
        });
      }
      await updateRecord.mutateAsync({
        modelName: 'Order', // Model name
        recordId: recordData.id, // Record ID
        updates, // Update data
      });
      setOpenToast(!openToast);
      setInitialData(recordData);
      // get dashboards by modelName & update them
      getAndUpdateDashboardItems('Order');
    } catch (error) {
      console.error('Error updating record:', error);
    }
    return true;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [columns, setColumns] = useState<any[]>([
    {
      id: 'name',
      name: 'Name',
      sequence: 1,
    },
    {
      id: 'quantity',
      name: 'Quantity',
      sequence: 3,
    },
    {
      id: 'price',
      name: 'Unit Price	',
      sequence: 4,
    },
    {
      id: 'subtotal',
      name: 'Subtotal',
      sequence: 5,
    },
  ]);
  const [optionalColumns, setOptionalColumns] = useState([
    {
      id: 'description',
      name: 'Description',
      sequence: 2,
    },
  ]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((col) => col.id)
  );

  const toggleColumnVisibility = (column: any) => {
    if (columns.some((col) => col.id === column.id)) {
      // If the column is already visible, hide it
      setColumns(columns.filter((col) => col.id !== column.id));
    } else {
      // If the column is not visible, show it and maintain the sequence order
      const updatedVisibleColumns = [...columns];
      updatedVisibleColumns.splice(column.sequence - 1, 0, column);
      setColumns(updatedVisibleColumns);
    }
  };

  const handleSaveChanges = () => {
    setNewLineEnabled(false);
    setItems([...items, newProduct]);
    // save updates
    handleUpdateProducts([...items, newProduct]);
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
    // save updates
    handleUpdateProducts(updatedItems);
  };

  useEffect(() => {
    setVisibleColumns(columns.map((col) => col.id));
  }, [columns]);

  return (
    <Container>
      <ControlPanel>
        <Breadcrumb items={breadcrumbs} />
        <div className="flex items-center space-x-4">
          {!editable && (
            <>
              <PrimaryButton onClick={() => setEditable(!editable)}>
                <PencilSquareIcon width={20} height={20} />
                <span>Edit</span>
              </PrimaryButton>
              <SecondaryButton>
                <PrinterIcon width={20} height={20} />
              </SecondaryButton>
            </>
          )}
          {editable && (
            <>
              <PrimaryButton onClick={() => handleUpdate()}>
                <CheckCircleIcon width={20} height={20} />
                <span>Save</span>
              </PrimaryButton>
              <SecondaryButton onClick={() => handleOpenDialog()}>
                <XCircleIcon width={20} height={20} />
                <span>Discard</span>
              </SecondaryButton>
            </>
          )}
        </div>
      </ControlPanel>
      {stages.length && (
        <Card>
          <Stepper
            items={stages}
            currentStep={currentStage}
            currentSubStep={currentSubStage}
            next={handleUpdateStage}
            enabled={!editable}
          />
        </Card>
      )}
      {openToast && <Toast title={toastData.title} type={toastData.type} />}
      {openDialog && (
        <Dialog
          title="Confirmation"
          message="Are you sure you want to exit? There are unsaved changes that may be lost."
          open={openDialog}
          discardButton="No"
          confirmButton="Yes"
          onDiscard={() => setOpenDialog(!openDialog)}
          onConfirm={() => handleDiscard()}
        />
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-4 col-span-1">
            {recordData?.individual && (
              <IndividualCard individual={recordData?.individual} />
            )}
            {recordData?.organization && (
              <OrganizationCard organization={recordData?.organization} />
            )}
            <Card>
              <Tab
                values={['Notes', 'Tasks', 'Documents', 'Logs']}
                activeIndex={activeIndex}
                handleClick={setActiveIndex}
              >
                <TabPanel activeIndex={activeIndex} index={0}>
                  <NotePanel modelName="Order" recordId={data.id} />
                </TabPanel>
                <TabPanel activeIndex={activeIndex} index={1}>
                  <TaskPanel
                    modelName="Order"
                    recordId={data.id}
                    recordName={data.name}
                  />
                </TabPanel>
                <TabPanel activeIndex={activeIndex} index={2}>
                  <DocumentPanel
                    modelName="Order"
                    recordId={data.id}
                    recordTitle={data.name}
                  />
                </TabPanel>
                <TabPanel activeIndex={activeIndex} index={3}>
                  <LogPanel modelName="Order" recordId={data.id} />
                </TabPanel>
              </Tab>
            </Card>
          </div>
          <div className="col-span-2 space-y-4">
            <Card>
              <div className="space-y-4">
                <h1>Order Information</h1>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <Input
                      disabled
                      label="Reference"
                      name="name"
                      value={recordData?.name}
                      handleChange={() => null}
                    />
                  </div>
                  <div className="col-span-1">
                    <Input
                      disabled
                      label="Contact"
                      name="contact"
                      value={
                        recordData?.organization?.name ||
                        recordData?.individual?.name
                      }
                      handleChange={() => null}
                    />
                  </div>
                  <div className="col-span-1">
                    <Input
                      disabled
                      label="Opportunity"
                      name="opportunity"
                      value={recordData?.opportunity?.name}
                      handleChange={() => null}
                    />
                  </div>
                  <div className="col-span-1">
                    <Input
                      disabled={!editable}
                      label="Validity Period"
                      name="validityPeriod"
                      value={recordData?.validityPeriod}
                      handleChange={handleInputChange}
                    />
                  </div>
                  <div className="col-span-1">
                    <Input
                      disabled
                      label="Created Date"
                      name="createdAt"
                      value={new Date(
                        recordData?.createdAt
                      ).toLocaleDateString()}
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
                          new Date(recordData?.createdAt).getDate() +
                            parseInt(recordData?.validityPeriod, 10) || 0
                        )
                      ).toLocaleDateString()}
                      handleChange={() => null}
                    />
                  </div>
                  <div className="col-span-1">
                    <Input
                      disabled
                      label="Salesperson"
                      name="user"
                      value={recordData?.user?.name}
                      handleChange={() => null}
                    />
                  </div>
                  <div className="col-span-1">
                    <Input
                      disabled
                      label="Sales Team"
                      name="salesTeam"
                      value={recordData?.salesTeam}
                      handleChange={() => null}
                    />
                  </div>
                  <div className="col-span-1">
                    <Input
                      disabled
                      label="Total Amount"
                      name="totalAmount"
                      value={`$ ${recordData?.totalAmount}`}
                      handleChange={() => null}
                    />
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <div className="space-y-2">
                <div className="flex items-end justify-between">
                  <h1>Products</h1>
                  <IconButton
                    disabled={editable}
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
                  optionalColumns={optionalColumns}
                  handleColumnChange={toggleColumnVisibility}
                >
                  {items.map((item: any, index: number) => (
                    <tr
                      className={`group hover:bg-serene-50 ${
                        index + 1 !== items.length &&
                        'border-b border-b-gray-200'
                      }`}
                      key={item.id}
                    >
                      <td className="py-4 px-6">{index + 1}</td>
                      <td className="py-4 px-6">{item.product?.name}</td>
                      {visibleColumns.includes('description') && (
                        <td className="py-4 px-6">
                          {item.product?.description}
                        </td>
                      )}
                      <td className="py-4 px-6">{item.quantity}</td>
                      <td className="py-4 px-6">{item.product?.price}</td>
                      <td className="py-4 px-6">$ {item.subTotal}</td>
                      <td className="py-4 px-6">
                        <IconButton
                          disabled={editable}
                          onClick={() => handleRemoveProduct(item)}
                        >
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
                      <td className="py-4 px-6">
                        $ {newProduct?.product?.price || 0}
                      </td>
                      <td className="py-4 px-6">
                        $ {newProduct?.subTotal || 0}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <IconButton
                            disabled={editable}
                            onClick={handleSaveChanges}
                          >
                            <CheckIcon
                              width={20}
                              height={20}
                              className="stroke-serene-500 hover:stroke-gray-900"
                              title="Save Changes"
                            />
                          </IconButton>
                          <IconButton
                            disabled={editable}
                            onClick={handleDiscardChanges}
                          >
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
                <Paginator
                  itemsPerPage={5}
                  totalItems={items.length}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            </Card>
          </div>
        </div>
      )}
    </Container>
  );
}
