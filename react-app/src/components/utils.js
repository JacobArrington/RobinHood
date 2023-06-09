export const filterDataByTimeframe = (data, timeframe) => {
    const currentDate = new Date()
    let filteredData = data
    switch (timeframe) {
  
      case 'daily':
        // Get the last date in history by mapping the data to a list of dates, and then finding the latest date
        const lastDateInHistory = new Date(Math.max.apply(null, data.map((hist) => new Date(hist.date))));
        //Calculate the date before the last date in history by subtracting 24 hours (in milliseconds) from the last date
        const previousDateInHistory = new Date(lastDateInHistory - 24 * 60 * 60 * 1000); //24h in a day 60min in an hour 60 secs in a min 1k ms in a sec this = 86,400,000 in a day
        filteredData = data.filter((hist) => {
          const histDate = new Date(hist.date);
          // Check if the histDate is the same as the last date in the history OR check if the histDate is the same as the previous date in the history
          return lastDateInHistory.toDateString() === histDate.toDateString() || previousDateInHistory.toDateString() === histDate.toDateString();
        });
        break;
      case 'weekly':
        // Get the last date in history by mapping the data to a list of dates, and then finding the latest date
        const latestDateInHistory = new Date(Math.max.apply(null, data.map((hist) => new Date(hist.date))));
        filteredData = data.filter((hist) => {
          const histDate = new Date(hist.date);
          const startOfLastWeek = new Date(latestDateInHistory.getTime() - 7 * 24 * 60 * 60 * 1000); // calcs the ms in a week 60480000
          // filters out the dates that fall outside the week checks to see if hist or great or = to the start of last week and less or = to last day in hist only returns if condions passes
          return histDate >= startOfLastWeek && histDate <= latestDateInHistory;
        });
        break;
  
  
      case 'monthly':
        filteredData = data.filter((hist) => {
          const histDate = new Date(hist.date);
          // finds the first day of the month
          const startOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1); //subtracts one month from current month and sets the date to first day of last month
          // finds the last of the month 
          const endOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0); // sets the day of month to 0 since no 0 day rollsback to last day of prev month
          // returns only the dates that fall in the month that 
          return histDate >= startOfLastMonth && histDate <= endOfLastMonth;
        });
        break;
      case 'quarterly':
        filteredData = data.filter((hist) => {
          const histDate = new Date(hist.date);
          // checks if the hist date is current year if no match return false
          if (currentDate.getFullYear() !== histDate.getFullYear()) {
            return false;
          }
          // calcs the start and end of the end months of current qurter
          const currentQuarterStartMonth = Math.floor(currentDate.getMonth() / 3) * 3; //
          const currentQuarterEndMonth = currentQuarterStartMonth + 2;
  
          return histDate.getMonth() >= currentQuarterStartMonth && histDate.getMonth() <= currentQuarterEndMonth;
        });
        break;
  
      case 'yearly':
        filteredData = data.filter((hist) => {
          const histDate = new Date(hist.date);
          return currentDate.getFullYear() === histDate.getFullYear();
        });
        break;
      case 'full history':
        filteredData = data
      default:
        break;
    }
  
    return filteredData;
  }
  
  
  export const getGrowthRate = (data, timeframe) => {
    const filteredData = filterDataByTimeframe(data, timeframe);
    if (filteredData.length < 2) return 0;

    const startPrice = filteredData[0].price;
    const endPrice = filteredData[filteredData.length - 1].price;
    const growthRate = ((endPrice - startPrice) / startPrice) * 100

    return growthRate.toFixed(2)
  }
