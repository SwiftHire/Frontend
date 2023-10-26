export const dateFomatted = (date) => {
    let year = "";
    let month = "";
    if (date ==='' || date === undefined) {
      return '';
    }else{
        year = date.slice(0, 4);
        month = date.slice(5, 7);
    }
    if (month === '01') {
      month = 'Jan';
    } else if (month === '02') {
      month = 'Feb';
    } else if (month === '03') {
      month = 'Mar';
    } else if (month === '04') {
      month = 'Apr';
    } else if (month === '05') {
      month = 'May';
    } else if (month === '06') {
      month = 'Jun';
    } else if (month === '07') {
      month = 'Jul';
    } else if (month === '08') {
      month = 'Aug';
    } else if (month === '09') {
      month = 'Sep';
    } else if (month === '10') {
      month = 'Oct';
    } else if (month === '11') {
      month = 'Nov';
    } else if (month === '12') {
      month = 'Dec';
    }
    return `${month} ${year}`;
  };
