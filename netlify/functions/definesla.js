export default async (sla, period) => {
    periods = {
        yearly: 365 * 24 * 60 * 60,
        quarterly: yearly / 4,
        monthly: yearly / 12,
        daily: 24 * 60 * 60
    };
    if ((typeof sla === "number" && 0 < sla < 100 && sla.isFinite) && (typeof period === "string" && Object.keys(periods).includes(period))) {
        uptime = (1-(sla/100))*period;
        return {
            statusCode: 200,
            body: JSON.stringify(
                {
                    status: 'success',
                    data: {
                        nbHours: Math.floor(uptime / 3600),
                        nbMinutes: Math.floor((uptime % 3600) / 60),
                        nbSeconds: Math.floor(uptime % 60)
                    }
                }
            )
        }
    }
    else {
        return {
            statusCode: 400,
            
            body: JSON.stringify(
                {
                    status: 'error',
                    reason: 'bad parameters'
                }
            )
        }
    }
}