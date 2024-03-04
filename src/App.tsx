import React, { lazy, Suspense, useEffect, useState } from 'react';
import { ModuleProvider, useModuleContext } from './context/ModuleContext';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import NotFound from '@page/NotFound';
import Login from '@page/Login';
import OrganizationList from '@page/Organization/OrganizationList';
import OrganizationDetails from '@page/Organization/OrganizationDetails';
import IndividualList from '@page/Individual/IndividualList';
import IndividualDetails from '@page/Individual/IndividualDetails';
import LeadList from '@page/Lead/LeadList';
import LeadDetails from '@page/Lead/LeadDetails';
import OpportunityList from '@page/Opportunity/OpportunityList';
import OpportunityDetails from '@page/Opportunity/OpportunityDetails';
import SalespersonList from '@page/Sales/SalespersonList';
import Layout from './layout/Layout';
import TemplateBoard from '@page/Dashboard/TemplateBoard';
import TemplateDetails from '@page/Dashboard/TemplateDetails';
import Dashboard from '@page/Dashboard/Dashboard';
import Favorites from '@page/Home/Favorites';
import Reminders from '@page/Schedule/Reminders';
import TaskList from '@page/Schedule/TaskList';
import FileList from '@page/Document/FileList';
import DocumentExplorer from '@page/Document/DocumentExplorer';
import CalendarView from '@page/Schedule/CalendarView';
import EmailBox from '@page/Email/EmailBox';
import InvoiceList from '@page/Invoice/InvoiceList';
import InvoiceDetails from '@page/Invoice/InvoiceDetails';
import QuoteList from '@page/Quote/QuoteList';
import QuoteDetails from '@page/Quote/QuoteDetails';
import OrderList from '@page/Order/OrderList';
import OrderDetails from '@page/Order/OrderDetails';
import EmployeeList from '@page/Employee/EmployeeList';
import EmployeeDetails from '@page/Employee/EmployeeDetails';
import DepartmentList from '@page/Department/DepartmentList';
import DepartmentDetails from '@page/Department/DepartmentDetails';
import ContractList from '@page/Contract/ContractList';
import ContractDetails from '@page/Contract/ContractDetails';
import OnboardingList from '@page/Onboarding/OnboardingList';
import OnboardingDetails from '@page/Onboarding/OnboardingDetails';
import OffboardingList from '@page/Offboarding/OffboardingList';
import OffboardingDetails from '@page/Offboarding/OffboardingDetails';
import LeaveList from '@page/Leave/LeaveList';
import LeaveDetails from '@page/Leave/LeaveDetails';
import RemoteList from '@page/Remote/RemoteList';
import RemoteDetails from '@page/Remote/RemoteDetails';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <ModuleProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route path="/reminders" element={<Reminders />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/documents" element={<FileList />} />
              <Route path="/favorites" element={<Favorites />} />

              <Route path="/templates" element={<TemplateBoard />} />
              <Route path="/templates/:id" element={<TemplateDetails/>} />
              <Route path="/dashboard/:id" element={<Dashboard />} />
              
              <Route path="/document-file" element={<FileList />} />
              <Route path="/document-explorer" element={<DocumentExplorer />} />

              <Route path="/calendar" element={<CalendarView />} />
              <Route path="/reminders" element={<Reminders />} />
              <Route path="/tasks" element={<TaskList />} />
              
              <Route path="/inbox" element={<EmailBox />} />
              <Route path="/documents" element={<FileList />} />

              <Route path="/contact/organization">
                <Route index element={<OrganizationList />} />
                <Route path=":id" element={<OrganizationDetails />} />
              </Route>
              <Route path="/contact/individual">
                <Route index element={<IndividualList />} />
                <Route path=":id" element={<IndividualDetails />} />
              </Route>
              <Route path="/pipeline/lead">
                <Route index element={<LeadList />} />
                <Route path=":id" element={<LeadDetails />} />
              </Route>
              <Route path="/pipeline/opportunity">
                <Route index element={<OpportunityList />} />
                <Route path=":id" element={<OpportunityDetails />} />
              </Route>
              <Route path="/sales/salesperson">
                <Route index element={<SalespersonList />} />
              </Route>

              <Route path="/customers/organization">
                <Route index element={<OrganizationList />} />
                <Route path=":id" element={<OrganizationDetails />} />
              </Route>
              <Route path="/customers/individual">
                <Route index element={<IndividualList />} />
                <Route path=":id" element={<IndividualDetails />} />
              </Route>
              <Route path="/orders/quote">
                <Route index element={<QuoteList />} />
                <Route path=":id" element={<QuoteDetails />} />
              </Route>
              <Route path="/orders/order">
                <Route index element={<OrderList />} />
                <Route path=":id" element={<OrderDetails />} />
              </Route>
              <Route path="/sales/salesperson">
                <Route index element={<SalespersonList />} />
              </Route>

              <Route path="/customers/organization">
                <Route index element={<OrganizationList />} />
                <Route path=":id" element={<OrganizationDetails />} />
              </Route>
              <Route path="/customers/individual">
                <Route index element={<IndividualList />} />
                <Route path=":id" element={<IndividualDetails />} />
              </Route>
              <Route path="/customers/invoices">
                <Route index element={<InvoiceList />} />
                <Route path=":id" element={<InvoiceDetails />} />
              </Route>

              <Route path="/profiles">
                <Route index element={<EmployeeList />} />
                <Route path=":id" element={<EmployeeDetails />} />
              </Route>
              <Route path="/departments">
                <Route index element={<DepartmentList />} />
                <Route path=":id" element={<DepartmentDetails />} />
              </Route>
              <Route path="/contracts">
                <Route index element={<ContractList />} />
                <Route path=":id" element={<ContractDetails />} />
              </Route>

              <Route path="/onboarding/process">
                <Route index element={<OnboardingList />} />
                <Route path=":id" element={<OnboardingDetails />} />
              </Route>
              <Route path="/offboarding/process">
                <Route index element={<OffboardingList />} />
                <Route path=":id" element={<OffboardingDetails />} />
              </Route>

              <Route path="/leaves">
                <Route index element={<LeaveList />} />
                <Route path=":id" element={<LeaveDetails />} />
              </Route>
              <Route path="/remote">
                <Route index element={<RemoteList />} />
                <Route path=":id" element={<RemoteDetails />} />
              </Route>

              <Route path="/*" element={<NotFound />} />
              
            </Routes>
          </Layout>
        </QueryClientProvider>
      </BrowserRouter>
    </ModuleProvider>
  );
};

export default App;
