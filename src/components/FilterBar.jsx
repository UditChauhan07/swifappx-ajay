// import React from 'react';
// import { ButtonGroup, Button } from 'react-bootstrap';

// const FilterBar = ({ activeFilter, setActiveFilter, dateFilter, setDateFilter }) => {
//   return (
//     <div className="filter-bar p-3 mb-4">
//       <div className="d-flex flex-wrap gap-3">
//         <div>
//           <small className="text-muted d-block mb-2">Status Filter</small>
//           <ButtonGroup>
//             <Button 
//               variant={activeFilter === 'all' ? 'primary' : 'outline-primary'}
//               onClick={() => setActiveFilter('all')}
//             >
//               All
//             </Button>
//             <Button 
//               variant={activeFilter === 'urgent' ? 'primary' : 'outline-primary'}
//               onClick={() => setActiveFilter('urgent')}
//             >
//               Urgent
//             </Button>
//             <Button 
//               variant={activeFilter === 'pending' ? 'primary' : 'outline-primary'}
//               onClick={() => setActiveFilter('pending')}
//             >
//               Pending
//             </Button>
//             <Button 
//               variant={activeFilter === 'completed' ? 'primary' : 'outline-primary'}
//               onClick={() => setActiveFilter('completed')}
//             >
//               Completed
//             </Button>
//           </ButtonGroup>
//         </div>
        
//         <div>
//           <small className="text-muted d-block mb-2">Time Period</small>
//           <ButtonGroup>
//             <Button 
//               variant={dateFilter === 'all' ? 'primary' : 'outline-primary'}
//               onClick={() => setDateFilter('all')}
//             >
//               All Time
//             </Button>
//             <Button 
//               variant={dateFilter === 'weekly' ? 'primary' : 'outline-primary'}
//               onClick={() => setDateFilter('weekly')}
//             >
//               This Week
//             </Button>
//             <Button 
//               variant={dateFilter === 'monthly' ? 'primary' : 'outline-primary'}
//               onClick={() => setDateFilter('monthly')}
//             >
//               This Month
//             </Button>
//           </ButtonGroup>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterBar;
import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const FilterBar = ({ activeFilter, setActiveFilter, dateFilter, setDateFilter }) => {
  const { t } = useTranslation(); // Translation hook

  return (
    <div className="filter-bar p-3 mb-4">
      <div className="d-flex flex-wrap gap-3">
        {/* Status Filter */}
        {/* <div>
          <small className="text-muted d-block mb-2">{t('statusFilter')}</small>
          <ButtonGroup>
            <Button 
              variant={activeFilter === 'all' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveFilter('all')}
            >
              {t('all')}
            </Button>
            <Button 
              variant={activeFilter === 'urgent' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveFilter('urgent')}
            >
              {t('urgent')}
            </Button>
            <Button 
              variant={activeFilter === 'pending' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveFilter('pending')}
            >
              {t('pending')}
            </Button>
            <Button 
              variant={activeFilter === 'completed' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveFilter('completed')}
            >
              {t('completed')}
            </Button>
          </ButtonGroup>
        </div> */}
        
        {/* Time Period Filter */}
        <div>
          <small className="text-muted d-block mb-2">{t('timePeriod')}</small>
          <ButtonGroup>
            <Button 
              variant={dateFilter === 'today' ? 'dark' : 'outline-dark'}
              onClick={() => setDateFilter('today')}
            >
              {t('today')}
            </Button>
            <Button 
              variant={dateFilter === 'weekly' ? 'dark' : 'outline-dark'}
              onClick={() => setDateFilter('weekly')}
            >
              {t('thisWeek')}
            </Button>
            <Button 
              variant={dateFilter === 'monthly' ? 'dark' : 'outline-dark'}
              onClick={() => setDateFilter('monthly')}
            >
              {t('thisMonth')}
            </Button>
            <Button 
              variant={dateFilter === 'all' ? 'dark' : 'outline-dark'}
              onClick={() => setDateFilter('all')}
            >
              {t('allTime')}
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
