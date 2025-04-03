# dropdown-datepicker

```
<DropdownDate
    selectedDate={formatDateToYYYYMMDD(startDate) || ''}
    order={[
        // optional
        DropdownComponent.month,
        DropdownComponent.day,
        DropdownComponent.year, // Order of the dropdowns
    ]}

    onDateChange={(date: Date) => {
        // optional
        console.log( formatDateToYYYYMMDD(date));
        setStartDate(date);
    }}
    ids={
        // optional
        {
            year: 'select-year',
            month: 'select-month',
            day: 'select-day',
        }
    }
    names={
        // optional
        {
            year: 'year',
            month: 'month',
            day: 'day',
        }
    }
    classes={
        // optional
        {
            dateContainer: 'date-container',
        }
    }
    defaultValues={
        // optional
        {
            year: 'select year',
            month: 'select month',
            day: 'select day',
        }
    }
    options={
        // optional
        {
            yearReverse: true, // false by default
            monthShort: true, // false by default
            monthCaps: false, // false by default
        }
    }
/>

```
