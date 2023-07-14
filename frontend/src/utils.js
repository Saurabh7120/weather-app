import { format } from "date-fns"

export const Format = (date, formatDate) => {
    if (date.length <= 10) {
        date = date.replace(/\./g, '-')
   }

    return format(new Date(date), formatDate)
}