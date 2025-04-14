export const initFromJson = async () => {
    const hasData = localStorage.getItem('organization');
    if (!hasData) {
      const response = await fetch('/data.json');
      const data = await response.json();
  
      localStorage.setItem('organization', JSON.stringify(data.organization));
      localStorage.setItem('departments', JSON.stringify(data.departments));
      localStorage.setItem('employees', JSON.stringify(data.employees));
    }
  };
  