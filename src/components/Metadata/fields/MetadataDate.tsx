import { useRef, useState, type FC } from "react";
import { MetadataField } from "../MetadataField/MetadataField";
import { DateInputStyled, DateRowStyled, UseDateButtonStyled } from "./MetadataDate.styled";

interface MetadataDateProps {
  timestamp: Date;
  lastModified: number;
}

function toDatetimeLocalValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
}

export const MetadataDate: FC<MetadataDateProps> = ({ timestamp, lastModified }) => {
  const fileDate = new Date(lastModified);
  const [date, setDate] = useState(timestamp);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <MetadataField label="Date">
      <DateRowStyled>
        <span>{date.toLocaleString()}</span>
        {date.getTime() !== fileDate.getTime() && (
          <UseDateButtonStyled onClick={() => setDate(fileDate)}>
            Use file date ({fileDate.toLocaleString()})
          </UseDateButtonStyled>
        )}
        <UseDateButtonStyled onClick={() => inputRef.current?.showPicker()}>
          Select date
        </UseDateButtonStyled>
        <DateInputStyled
          ref={inputRef}
          type="datetime-local"
          value={toDatetimeLocalValue(date)}
          onChange={(e) => {
            if (e.target.value) setDate(new Date(e.target.value));
          }}
        />
      </DateRowStyled>
    </MetadataField>
  );
};
