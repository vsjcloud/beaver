import {Button, FormGroup, Icon, Tooltip} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import {DateInput} from "@blueprintjs/datetime";
import {IconNames} from "@blueprintjs/icons";
import {Timestamp} from "google-protobuf/google/protobuf/timestamp_pb";
import {DateTime, Duration} from "luxon";
import React from "react";

import {FormField} from "../../../../core/form/formField";
import {PropsWithRegisterField} from "../../../../core/form/formValidator";
import * as Utils from "../../../../utils";
import * as DateTimeUtils from "../../../../utils/datetime";

const MIN_DATE = DateTime.local().minus(Duration.fromObject({years: 20})).toJSDate();
const MAX_DATE = DateTime.local().plus(Duration.fromObject({years: 20})).toJSDate();

export type ProjectDatesFieldProps = PropsWithRegisterField<{
  initialStartDate?: Timestamp;
  initialFinishDate?: Timestamp;
  onChange(newStartDate: Timestamp | undefined, newFinishDate: Timestamp | undefined): void;
}>;

export type ProjectDates = {
  startDate: Date | null;
  finishDate: Date | null;
};

export function ProjectDatesField({
  initialStartDate,
  initialFinishDate,
  onChange,
  registerField = Utils.identity,
}: ProjectDatesFieldProps): React.ReactElement {
  const [dates, setDates] = registerField(
    React.useState(
      new FormField<ProjectDates>(
        {
          startDate: initialStartDate?.toDate() || null,
          finishDate: initialFinishDate?.toDate() || null,
        },
        [],
      ),
    ),
  );

  React.useEffect(function () {
    const {startDate, finishDate} = dates.getValue();
    onChange(
      startDate ? DateTimeUtils.jsDateToProtoTimestamp(startDate) : undefined,
      finishDate ? DateTimeUtils.jsDateToProtoTimestamp(finishDate) : undefined,
    );
  }, [onChange, dates]);

  function onStartDateChange(selectedDate: Date | null, isUserChange: boolean): void {
    if (!isUserChange) return;
    setDates(dates => dates.setValue({
      startDate: selectedDate,
      finishDate: dates.getValue().finishDate,
    }));
  }

  function onFinishDateChange(selectedDate: Date | null, isUserChange: boolean): void {
    if (!isUserChange) return;
    setDates(dates => dates.setValue({
      startDate: dates.getValue().startDate,
      finishDate: selectedDate,
    }));
  }

  function formatDate(date: Date): string {
    return DateTime.fromJSDate(date).setLocale("vi").toFormat("DDD");
  }

  function parseDate(date: string): Date {
    return DateTime.fromFormat(date, "DDD", {locale: "vi"}).toJSDate();
  }

  return (
    <div className="flex flex-row justify-between items-center">
      <FormGroup
        label="Ngày bắt đầu dự án"
      >
        <DateInput
          onChange={onStartDateChange}
          value={dates.getValue().startDate}
          formatDate={formatDate}
          parseDate={parseDate}
          minDate={MIN_DATE}
          initialMonth={dates.getValue().startDate || dates.getValue().finishDate || new Date()}
          maxDate={dates.getValue().finishDate || MAX_DATE}
          placeholder="Ngày bắt đầu dự án..."
          locale="vi"
          rightElement={
            <Tooltip content="Xóa">
              <Button
                minimal={true}
                intent={Intent.WARNING}
                icon={IconNames.CROSS}
                onClick={(): void => onStartDateChange(null, true)}
              />
            </Tooltip>
          }
        />
      </FormGroup>
      <Icon iconSize={Icon.SIZE_LARGE} intent={Intent.PRIMARY} icon={IconNames.DOUBLE_CHEVRON_RIGHT}/>
      <FormGroup
        label="Ngày hoàn thành dự án"
      >
        <DateInput
          onChange={onFinishDateChange}
          value={dates.getValue().finishDate}
          formatDate={formatDate}
          parseDate={parseDate}
          minDate={dates.getValue().startDate || MIN_DATE}
          initialMonth={dates.getValue().finishDate || dates.getValue().startDate || new Date()}
          maxDate={MAX_DATE}
          placeholder="Ngày dự án hoàn thành..."
          rightElement={
            <Tooltip content="Xóa">
              <Button
                minimal={true}
                intent={Intent.WARNING}
                icon={IconNames.CROSS}
                onClick={(): void => onFinishDateChange(null, true)}
              />
            </Tooltip>
          }
        />
      </FormGroup>
    </div>
  );
}
