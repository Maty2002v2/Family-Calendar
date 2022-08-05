type DayObject = {
  id?: number;
  calendarId: string;
  numberDay?: number;
  numberMonth: string;
  numberYear?: number;
  toRepeat?: boolean;
  title?: string;
  description?: string;
  categoryDay?: number;
};

export default DayObject;
