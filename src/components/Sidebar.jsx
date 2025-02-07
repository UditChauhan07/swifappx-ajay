// import React from 'react';
// import { Nav } from 'react-bootstrap';

// const Sidebar = ({ activeFilter, setActiveFilter, dateFilter, setDateFilter }) => {
//   return (
//     <div className="sidebar">
//       <div className="sidebar-header">

//         <h3>Work Order's </h3>
//       </div>
//       <Nav className="flex-column">
//         <Nav.Link 
//           className={activeFilter === 'all' ? 'active' : ''} 
//           onClick={() => setActiveFilter('all')}
//         >
//           All Orders
//         </Nav.Link>
//         <Nav.Link 
//           className={activeFilter === 'urgent' ? 'active' : ''} 
//           onClick={() => setActiveFilter('urgent')}
//         >
//           Urgent Orders
//         </Nav.Link>
//         <Nav.Link 
//           className={activeFilter === 'pending' ? 'active' : ''} 
//           onClick={() => setActiveFilter('pending')}
//         >
//           Pending Orders
//         </Nav.Link>
//         <Nav.Link 
//           className={activeFilter === 'completed' ? 'active' : ''} 
//           onClick={() => setActiveFilter('completed')}
//         >
//           Completed Orders
//         </Nav.Link>
        
//         <div className="sidebar-header mt-4">
//           <h5>Time Filters</h5>
//         </div>
//         <Nav.Link 
//           className={dateFilter === 'all' ? 'active' : ''} 
//           onClick={() => setDateFilter('all')}
//         >
//           All Time
//         </Nav.Link>
//         <Nav.Link 
//           className={dateFilter === 'weekly' ? 'active' : ''} 
//           onClick={() => setDateFilter('weekly')}
//         >
//           This Week
//         </Nav.Link>
//         <Nav.Link 
//           className={dateFilter === 'monthly' ? 'active' : ''} 
//           onClick={() => setDateFilter('monthly')}
//         >
//           This Month
//         </Nav.Link>
//       </Nav>
//     </div>
//   );
// };

// export default Sidebar;
import React from 'react';
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ activeFilter, setActiveFilter, dateFilter, setDateFilter }) => {
  const { t } = useTranslation(); // Translation hook

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>{t('workOrders')}</h3>
      </div>

      <Nav className="flex-column">
        <Nav.Link 
          className={activeFilter === 'all' ? 'active' : ''} 
          onClick={() => setActiveFilter('all')}
        >
          {t('allOrders')}
        </Nav.Link>
        {/* <Nav.Link 
          className={activeFilter === 'urgent' ? 'active' : ''} 
          onClick={() => setActiveFilter('urgent')}
        >
          {t('urgentOrders')}
        </Nav.Link> */}
        <Nav.Link 
          className={activeFilter === 'Pending' ? 'active' : ''} 
          onClick={() => setActiveFilter('Pending')}
        >
          {t('pendingOrders')}
        </Nav.Link>
        <Nav.Link 
          className={activeFilter === 'Completed' ? 'active' : ''} 
          onClick={() => setActiveFilter('Completed')}
        >
          {t('completedOrders')}
        </Nav.Link>
        
        {/* <div className="sidebar-header mt-4">
          <h5>{t('timeFilters')}</h5>
        </div>
        <Nav.Link 
          className={dateFilter === 'all' ? 'active' : ''} 
          onClick={() => setDateFilter('all')}
        >
          {t('allTime')}
        </Nav.Link>
        <Nav.Link 
          className={dateFilter === 'weekly' ? 'active' : ''} 
          onClick={() => setDateFilter('weekly')}
        >
          {t('thisWeek')}
        </Nav.Link>
        <Nav.Link 
          className={dateFilter === 'monthly' ? 'active' : ''} 
          onClick={() => setDateFilter('monthly')}
        >
          {t('thisMonth')}
        </Nav.Link> */}


{/* 
      <Nav.Link 
          // className={} 
          onClick={() => setDateFilter('monthly')}
        >
          {t('Create Workorder')}
      </Nav.Link>
      <Nav.Link 
          className={dateFilter === 'monthly' ? 'active' : ''} 
          onClick={() => setDateFilter('monthly')}
        >
          {t('Create customer')}
        </Nav.Link> */}
      </Nav>
    </div>
  );
};

export default Sidebar;
