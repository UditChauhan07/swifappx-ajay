// utils/dateHelper.js

export const formatDate = (dateString, locale = "en-GB", formatType = "short") => {
    const lang=localStorage.getItem('i18nextLng');
    if(lang=='es'){
      locale='es-ES';
    }
    let date;

    // ✅ Handle different date formats
    if (dateString.includes("-")) {
      const parts = dateString.split("-");
      
      // Detects if the format is DD-MM-YYYY instead of YYYY-MM-DD
      if (parts[0].length === 4) {
        date = new Date(dateString); // YYYY-MM-DD (valid format)
      } else {
        date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`); // Convert DD-MM-YYYY to YYYY-MM-DD
      }
    } else {
      date = new Date(dateString);
    }
    
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: formatType, // "long" for full month, "short" for abbreviated month
      year: "numeric"
    }).format(date);
  };
  
  export function convertToAMPM(time) {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12
    return `${formattedHours}:${String(minutes).padStart(2, "0")} ${period}`;
  }