exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ status: "error", reason: "Method not allowed" }),
      };
    }
  
    try {
      const { sla, period } = JSON.parse(event.body);
  
      if (typeof sla !== 'number' || !['yearly', 'quarterly', 'monthly', 'daily'].includes(period)) {
        throw new Error("bad parameters");
      }
  
      const periods = {
        yearly: 365 * 24 * 60 * 60,
        quarterly: 91.25 * 24 * 60 * 60,
        monthly: 30.44 * 24 * 60 * 60,
        daily: 24 * 60 * 60,
      };
  
      const totalSeconds = periods[period] * sla / 100;
      const nbHours = Math.floor(totalSeconds / 3600);
      const nbMinutes = Math.floor((totalSeconds % 3600) / 60);
      const nbSeconds = Math.floor(totalSeconds % 60);
  
      return {
        statusCode: 200,
        body: JSON.stringify({ status: "success", data: { nbHours, nbMinutes, nbSeconds } }),
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ status: "error", reason: "bad parameters" }),
      };
    }
  };