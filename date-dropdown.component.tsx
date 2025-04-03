import React, { useState, useEffect } from 'react';
import { monthByNumber, getDaysInMonth } from './helper';

export enum DropdownComponent {
	year = 'year',
	month = 'month',
	day = 'day',
}

interface IProps {
	startDate?: string;
	endDate?: string;
	selectedDate?: string;
	order?: DropdownComponent[];
	onMonthChange?: (value: any) => void;
	onDayChange?: (value: any) => void;
	onYearChange?: (value: any) => void;
	onDateChange?: (value: any) => void;
	ids?: {
		year?: string;
		month?: string;
		day?: string;
	};
	names?: {
		year?: string;
		month?: string;
		day?: string;
	};
	classes?: {
		dateContainer?: string;
		yearContainer?: string;
		monthContainer?: string;
		dayContainer?: string;
		year?: string;
		month?: string;
		day?: string;
		yearOptions?: string;
		monthOptions?: string;
		dayOptions?: string;
	};
	defaultValues?: {
		year?: string;
		month?: string;
		day?: string;
	};
	options?: {
		yearReverse?: boolean;
		monthShort?: boolean;
		monthCaps?: boolean;
	};
}

export const DropdownDate: React.FC<IProps> = ({
	startDate,
	endDate,
	selectedDate,
	order = [
		DropdownComponent.year,
		DropdownComponent.month,
		DropdownComponent.day,
	],
	onMonthChange,
	onDayChange,
	onYearChange,
	onDateChange,
	ids,
	names,
	classes,
	defaultValues,
	options,
}) => {
	const sDate = startDate ? new Date(startDate) : new Date('1900-01-01');
	const eDate = endDate ? new Date(endDate) : new Date();
	const selDate = selectedDate ? new Date(selectedDate) : null;

	const startYear = sDate.getFullYear();
	const startMonth = sDate.getMonth();
	const startDay = sDate.getDate();

	const endYear = eDate.getFullYear();
	const endMonth = eDate.getMonth();
	const endDay = eDate.getDate();

	const [selectedYear, setSelectedYear] = useState(
		selDate ? selDate.getFullYear() : -1
	);
	const [selectedMonth, setSelectedMonth] = useState(
		selDate ? selDate.getMonth() : -1
	);
	const [selectedDay, setSelectedDay] = useState(
		selDate ? selDate.getDate() : -1
	);

	useEffect(() => {
		if (selectedDate) {
			const selDate = new Date(selectedDate);
			setSelectedYear(selDate.getFullYear());
			setSelectedMonth(selDate.getMonth());
			setSelectedDay(selDate.getDate());
		}
	}, [selectedDate]);

	const generateYearOptions = () => {
		const yearOptions: React.ReactNode[] = [];
		yearOptions.push(
			<option key={-1} value="-1" className={classes?.yearOptions}>
				{defaultValues?.year ?? ''}
			</option>
		);

		if (options?.yearReverse) {
			for (let i = endYear; i >= startYear; i--) {
				yearOptions.push(
					<option key={i} value={i} className={classes?.yearOptions}>
						{i}
					</option>
				);
			}
		} else {
			for (let i = startYear; i <= endYear; i++) {
				yearOptions.push(
					<option key={i} value={i} className={classes?.yearOptions}>
						{i}
					</option>
				);
			}
		}
		return yearOptions;
	};

	const generateMonthOptions = () => {
		let months: { value: number; month: string }[] = [];

		if (selectedYear === startYear && selectedYear === endYear) {
			for (let i = startMonth; i <= endMonth; i++) {
				months.push({
					value: i,
					month: monthByNumber[i],
				});
			}
		} else if (selectedYear === startYear) {
			for (let i = startMonth; i <= 11; i++) {
				months.push({
					value: i,
					month: monthByNumber[i],
				});
			}
		} else if (selectedYear === endYear) {
			for (let i = 0; i <= endMonth; i++) {
				months.push({
					value: i,
					month: monthByNumber[i],
				});
			}
		} else {
			for (let i = 0; i <= 11; i++) {
				months.push({
					value: i,
					month: monthByNumber[i],
				});
			}
		}

		if (options?.monthShort) {
			months = months.map((elem) => ({
				value: elem.value,
				month: elem.month.substring(0, 3),
			}));
		}

		if (options?.monthCaps) {
			months = months.map((elem) => ({
				value: elem.value,
				month: elem.month.toUpperCase(),
			}));
		}

		const monthOptions: React.ReactNode[] = [];
		monthOptions.push(
			<option key={-1} value="-1" className={classes?.monthOptions}>
				{defaultValues?.month ?? ''}
			</option>
		);
		months.forEach((elem) => {
			monthOptions.push(
				<option
					key={elem.value}
					value={elem.value}
					className={classes?.monthOptions}
				>
					{elem.month}
				</option>
			);
		});
		return monthOptions;
	};

	const generateDayOptions = () => {
		const dayOptions: React.ReactNode[] = [];
		const monthDays = getDaysInMonth(selectedYear, selectedMonth);
		dayOptions.push(
			<option key={-1} value="-1" className={classes?.dayOptions}>
				{defaultValues?.day || ''}
			</option>
		);

		// Handle day options based on the year and month ranges
		if (selectedYear === startYear && selectedYear === endYear) {
			if (selectedMonth === startMonth && selectedMonth === endMonth) {
				// Within the same month range
				for (let i = startDay; i <= endDay; i++) {
					dayOptions.push(
						<option key={i} value={i} className={classes?.dayOptions}>
							{i}
						</option>
					);
				}
			} else if (selectedMonth === startMonth) {
				// Start month with range from startDay
				for (let i = startDay; i <= monthDays; i++) {
					dayOptions.push(
						<option key={i} value={i} className={classes?.dayOptions}>
							{i}
						</option>
					);
				}
			} else if (selectedMonth === endMonth) {
				// End month with range until endDay
				for (let i = 1; i <= endDay; i++) {
					dayOptions.push(
						<option key={i} value={i} className={classes?.dayOptions}>
							{i}
						</option>
					);
				}
			} else {
				// Regular month between start and end months
				for (let i = 1; i <= monthDays; i++) {
					dayOptions.push(
						<option key={i} value={i} className={classes?.dayOptions}>
							{i}
						</option>
					);
				}
			}
		} else if (selectedYear === startYear) {
			if (selectedMonth === startMonth) {
				for (let i = startDay; i <= monthDays; i++) {
					dayOptions.push(
						<option key={i} value={i} className={classes?.dayOptions}>
							{i}
						</option>
					);
				}
			} else {
				for (let i = 1; i <= monthDays; i++) {
					dayOptions.push(
						<option key={i} value={i} className={classes?.dayOptions}>
							{i}
						</option>
					);
				}
			}
		} else if (selectedYear === endYear) {
			if (selectedMonth === endMonth) {
				for (let i = 1; i <= endDay; i++) {
					dayOptions.push(
						<option key={i} value={i} className={classes?.dayOptions}>
							{i}
						</option>
					);
				}
			} else {
				for (let i = 1; i <= monthDays; i++) {
					dayOptions.push(
						<option key={i} value={i} className={classes?.dayOptions}>
							{i}
						</option>
					);
				}
			}
		} else {
			for (let i = 1; i <= monthDays; i++) {
				dayOptions.push(
					<option key={i} value={i} className={classes?.dayOptions}>
						{i}
					</option>
				);
			}
		}

		return dayOptions;
	};

	const handleDateChange = (type: DropdownComponent, value: number) => {
		const [updatedYear, updatedMonth, updatedDay] = checkMonthAndDayValidity(
			type,
			value
		);

		if (updatedYear !== -1 && updatedMonth !== -1 && updatedDay !== -1) {
			onDateChange &&
				onDateChange(new Date(updatedYear, updatedMonth, updatedDay));
		}
	};

	const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const year = parseInt(e.target.value);
		setSelectedYear(year);
		onYearChange && onYearChange(year);
		handleDateChange(DropdownComponent.year, year);
	};

	const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const month = parseInt(e.target.value);
		setSelectedMonth(month);
		onMonthChange && onMonthChange(monthByNumber[month]);
		handleDateChange(DropdownComponent.month, month);
	};

	const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const day = parseInt(e.target.value);

		setSelectedDay(day);
		onDayChange && onDayChange(day);
		handleDateChange(DropdownComponent.day, day);
	};

	const checkMonthAndDayValidity = (
		changeType: DropdownComponent,
		value: any
	) => {
		switch (changeType) {
			case DropdownComponent.month:
				return [
					selectedYear,
					value,
					getValidDay(selectedYear, value, selectedDay),
				];

			case DropdownComponent.year: {
				const monthInYear = getMonthsInYear(value);
				const monthToReturn = monthInYear.includes(selectedMonth)
					? selectedMonth
					: monthInYear[0];
				const dayToReturn = getValidDay(value, monthToReturn, selectedDay);
				return [value, monthToReturn, dayToReturn];
			}
			case DropdownComponent.day:
				return [selectedYear, selectedMonth, value];

			default:
				return [selectedYear, selectedMonth, selectedDay];
		}
	};

	const getValidDay = (year: number, month: number, day: number) => {
		const daysInMonth = getDaysInMonth(year, month);
		return day > daysInMonth ? daysInMonth : day;
	};

	const getMonthsInYear = (year: any) => {
		const months: number[] = [];

		const start = year === startYear ? startMonth : 0;
		const end = year === endYear ? endMonth : 11;

		for (let i = start; i <= end; i++) {
			months.push(i);
		}

		return months;
	};

	const renderYear = () => (
		<div key="year" id="dropdown-year" className={classes?.yearContainer}>
			<select
				id={ids?.year}
				name={names?.year}
				className={classes?.year}
				onChange={handleYearChange}
				value={selectedYear}
			>
				{generateYearOptions()}
			</select>
		</div>
	);

	const renderMonth = () => (
		<div key="month" id="dropdown-month" className={classes?.monthContainer}>
			<select
				id={ids?.month}
				name={names?.month}
				className={classes?.month}
				onChange={handleMonthChange}
				value={selectedMonth}
			>
				{generateMonthOptions()}
			</select>
		</div>
	);

	const renderDay = () => (
		<div key="day" id="dropdown-day" className={classes?.dayContainer}>
			<select
				id={ids?.day}
				name={names?.day}
				className={classes?.day}
				onChange={handleDayChange}
				value={selectedDay}
			>
				{generateDayOptions()}
			</select>
		</div>
	);
	return (
		<div id="dropdown-date" className={classes?.dateContainer}>
			{order.map((part) => {
				if (part === DropdownComponent.year) return renderYear();
				if (part === DropdownComponent.month) return renderMonth();
				if (part === DropdownComponent.day) return renderDay();
				return null;
			})}
		</div>
	);
};

// Uncomment the following code if you want to use the class component version

{
	/* <DropdownDate
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
							/> */
}

// import * as React from 'react';
// import { monthByNumber, getDaysInMonth } from './helper';

// export enum DropdownComponent {
// 	year = 'year',
// 	month = 'month',
// 	day = 'day',
// }

// interface IProps {
// 	startDate?: string;
// 	endDate?: string;
// 	selectedDate?: string;
// 	order?: DropdownComponent[];
// 	onMonthChange?: Function;
// 	onDayChange?: Function;
// 	onYearChange?: Function;
// 	onDateChange?: Function;
// 	ids?: {
// 		year?: string;
// 		month?: string;
// 		day?: string;
// 	};
// 	names?: {
// 		year?: string;
// 		month?: string;
// 		day?: string;
// 	};
// 	classes?: {
// 		dateContainer?: string;
// 		yearContainer?: string;
// 		monthContainer?: string;
// 		dayContainer?: string;
// 		year?: string;
// 		month?: string;
// 		day?: string;
// 		yearOptions?: string;
// 		monthOptions?: string;
// 		dayOptions?: string;
// 	};
// 	defaultValues?: {
// 		year?: string;
// 		month?: string;
// 		day?: string;
// 	};
// 	options?: {
// 		yearReverse?: boolean;
// 		monthShort?: boolean;
// 		monthCaps?: boolean;
// 	};
// }

// interface IState {
// 	startYear: number;
// 	startMonth: number;
// 	startDay: number;
// 	endYear: number;
// 	endMonth: number;
// 	endDay: number;
// 	selectedYear: number;
// 	selectedMonth: number;
// 	selectedDay: number;
// }

// export class DropdownDate extends React.Component<IProps, IState> {
// 	renderParts: any;

// 	constructor(props: IProps) {
// 		super(props);
// 		const { startDate, endDate, selectedDate } = props;
// 		const sDate = startDate ? new Date(startDate) : new Date('1900-01-01');
// 		const eDate = endDate ? new Date(endDate) : new Date();
// 		const selDate = selectedDate ? new Date(selectedDate) : null;
// 		console.log('hitting;;;;');
// 		this.state = {
// 			startYear: sDate.getFullYear(),
// 			startMonth: sDate.getMonth(),
// 			startDay: sDate.getDate(),
// 			endYear: eDate.getFullYear(),
// 			endMonth: eDate.getMonth(),
// 			endDay: eDate.getDate(),
// 			selectedYear: selDate ? selDate.getFullYear() : -1,
// 			selectedMonth: selDate ? selDate.getMonth() : -1,
// 			selectedDay: selDate ? selDate.getDate() : -1,
// 		};
// 		this.renderParts = {
// 			year: this.renderYear,
// 			month: this.renderMonth,
// 			day: this.renderDay,
// 		};
// 	}

// 	static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
// 		const selDate = nextProps.selectedDate
// 			? new Date(nextProps.selectedDate)
// 			: null;
// 		const tempSelDate = {
// 			selectedYear: selDate ? selDate.getFullYear() : -1,
// 			selectedMonth: selDate ? selDate.getMonth() : -1,
// 			selectedDay: selDate ? selDate.getDate() : -1,
// 		};
// 		if (tempSelDate.selectedYear !== prevState.selectedYear) {
// 			return { selectedYear: tempSelDate.selectedYear };
// 		}
// 		if (tempSelDate.selectedMonth !== prevState.selectedMonth) {
// 			return { selectedMonth: tempSelDate.selectedMonth };
// 		}
// 		if (tempSelDate.selectedDay !== prevState.selectedDay) {
// 			return { selectedDay: tempSelDate.selectedDay };
// 		}
// 		return null;
// 	}

// 	generateYearOptions() {
// 		const { classes, options, defaultValues } = this.props;
// 		const { startYear, endYear } = this.state;
// 		const yearOptions: React.ReactNode[] = [];
// 		yearOptions.push(
// 			<option
// 				key={-1}
// 				value="-1"
// 				className={
// 					classes && classes.yearOptions ? classes.yearOptions : undefined
// 				}
// 			>
// 				{defaultValues && defaultValues.year ? defaultValues.year : ''}
// 			</option>
// 		);
// 		if (options && options.yearReverse) {
// 			for (let i = endYear; i >= startYear; i--) {
// 				yearOptions.push(
// 					<option
// 						key={i}
// 						value={i}
// 						className={
// 							classes && classes.yearOptions ? classes.yearOptions : undefined
// 						}
// 					>
// 						{i}
// 					</option>
// 				);
// 			}
// 		} else {
// 			for (let i = startYear; i <= endYear; i++) {
// 				yearOptions.push(
// 					<option
// 						key={i}
// 						value={i}
// 						className={
// 							classes && classes.yearOptions ? classes.yearOptions : undefined
// 						}
// 					>
// 						{i}
// 					</option>
// 				);
// 			}
// 		}
// 		return yearOptions;
// 	}

// 	generateMonthOptions() {
// 		const { classes, options, defaultValues } = this.props;
// 		const { startMonth, endMonth, startYear, endYear, selectedYear } =
// 			this.state;
// 		let months: { value: number; month: string }[] = [];

// 		if (selectedYear === startYear && selectedYear === endYear) {
// 			for (let i = startMonth; i <= endMonth; i++) {
// 				months.push({
// 					value: i,
// 					month: monthByNumber[i],
// 				});
// 			}
// 		} else if (selectedYear === startYear) {
// 			for (let i = startMonth; i <= 11; i++) {
// 				months.push({
// 					value: i,
// 					month: monthByNumber[i],
// 				});
// 			}
// 		} else if (selectedYear === endYear) {
// 			for (let i = 0; i <= endMonth; i++) {
// 				months.push({
// 					value: i,
// 					month: monthByNumber[i],
// 				});
// 			}
// 		} else {
// 			for (let i = 0; i <= 11; i++) {
// 				months.push({
// 					value: i,
// 					month: monthByNumber[i],
// 				});
// 			}
// 		}

// 		if (options && options.monthShort) {
// 			months = months.map((elem) => {
// 				return {
// 					value: elem.value,
// 					month: elem.month.substring(0, 3),
// 				};
// 			});
// 		}

// 		if (options && options.monthCaps) {
// 			months = months.map((elem) => {
// 				return {
// 					value: elem.value,
// 					month: elem.month.toUpperCase(),
// 				};
// 			});
// 		}

// 		const monthOptions: React.ReactNode[] = [];
// 		monthOptions.push(
// 			<option
// 				key={-1}
// 				value="-1"
// 				className={
// 					classes && classes.monthOptions ? classes.monthOptions : undefined
// 				}
// 			>
// 				{defaultValues && defaultValues.month ? defaultValues.month : ''}
// 			</option>
// 		);
// 		months.forEach((elem) => {
// 			monthOptions.push(
// 				<option
// 					key={elem.value}
// 					value={elem.value}
// 					className={
// 						classes && classes.monthOptions ? classes.monthOptions : undefined
// 					}
// 				>
// 					{elem.month}
// 				</option>
// 			);
// 		});

// 		return monthOptions;
// 	}

// 	generateDayOptions() {
// 		const { classes, defaultValues } = this.props;
// 		const {
// 			startYear,
// 			startMonth,
// 			startDay,
// 			endYear,
// 			endMonth,
// 			endDay,
// 			selectedYear,
// 			selectedMonth,
// 		} = this.state;
// 		const dayOptions: React.ReactNode[] = [];
// 		dayOptions.push(
// 			<option
// 				key={-1}
// 				value="-1"
// 				className={
// 					classes && classes.dayOptions ? classes.dayOptions : undefined
// 				}
// 			>
// 				{defaultValues && defaultValues.day ? defaultValues.day : ''}
// 			</option>
// 		);

// 		const monthDays = getDaysInMonth(selectedYear, selectedMonth);
// 		if (selectedYear === startYear && selectedYear === endYear) {
// 			if (selectedMonth === startMonth && selectedMonth === endMonth) {
// 				for (let i = startDay; i <= endDay; i++) {
// 					dayOptions.push(
// 						<option
// 							key={i}
// 							value={i}
// 							className={
// 								classes && classes.dayOptions ? classes.dayOptions : undefined
// 							}
// 						>
// 							{i}
// 						</option>
// 					);
// 				}
// 			} else if (selectedMonth === startMonth) {
// 				for (let i = startDay; i <= monthDays; i++) {
// 					dayOptions.push(
// 						<option
// 							key={i}
// 							value={i}
// 							className={
// 								classes && classes.dayOptions ? classes.dayOptions : undefined
// 							}
// 						>
// 							{i}
// 						</option>
// 					);
// 				}
// 			} else if (selectedMonth === endMonth) {
// 				for (let i = 1; i <= endDay; i++) {
// 					dayOptions.push(
// 						<option
// 							key={i}
// 							value={i}
// 							className={
// 								classes && classes.dayOptions ? classes.dayOptions : undefined
// 							}
// 						>
// 							{i}
// 						</option>
// 					);
// 				}
// 			} else {
// 				for (let i = 1; i <= monthDays; i++) {
// 					dayOptions.push(
// 						<option
// 							key={i}
// 							value={i}
// 							className={
// 								classes && classes.dayOptions ? classes.dayOptions : undefined
// 							}
// 						>
// 							{i}
// 						</option>
// 					);
// 				}
// 			}
// 		} else if (selectedYear === startYear) {
// 			if (selectedMonth === startMonth) {
// 				for (let i = startDay; i <= monthDays; i++) {
// 					dayOptions.push(
// 						<option
// 							key={i}
// 							value={i}
// 							className={
// 								classes && classes.dayOptions ? classes.dayOptions : undefined
// 							}
// 						>
// 							{i}
// 						</option>
// 					);
// 				}
// 			} else {
// 				for (let i = 1; i <= monthDays; i++) {
// 					dayOptions.push(
// 						<option
// 							key={i}
// 							value={i}
// 							className={
// 								classes && classes.dayOptions ? classes.dayOptions : undefined
// 							}
// 						>
// 							{i}
// 						</option>
// 					);
// 				}
// 			}
// 		} else if (selectedYear === endYear) {
// 			if (selectedMonth === endMonth) {
// 				for (let i = 1; i <= endDay; i++) {
// 					dayOptions.push(
// 						<option
// 							key={i}
// 							value={i}
// 							className={
// 								classes && classes.dayOptions ? classes.dayOptions : undefined
// 							}
// 						>
// 							{i}
// 						</option>
// 					);
// 				}
// 			} else {
// 				for (let i = 1; i <= monthDays; i++) {
// 					dayOptions.push(
// 						<option
// 							key={i}
// 							value={i}
// 							className={
// 								classes && classes.dayOptions ? classes.dayOptions : undefined
// 							}
// 						>
// 							{i}
// 						</option>
// 					);
// 				}
// 			}
// 		} else {
// 			if (selectedMonth) {
// 				for (let i = 1; i <= monthDays; i++) {
// 					dayOptions.push(
// 						<option
// 							key={i}
// 							value={i}
// 							className={
// 								classes && classes.dayOptions ? classes.dayOptions : undefined
// 							}
// 						>
// 							{i}
// 						</option>
// 					);
// 				}
// 			} else {
// 				for (let i = 1; i <= 31; i++) {
// 					dayOptions.push(
// 						<option
// 							key={i}
// 							value={i}
// 							className={
// 								classes && classes.dayOptions ? classes.dayOptions : undefined
// 							}
// 						>
// 							{i}
// 						</option>
// 					);
// 				}
// 			}
// 		}
// 		return dayOptions;
// 	}

// 	handleDateChange = (type: DropdownComponent, value: number) => {
// 		console.log('hitting');
// 		if (this.props.onDateChange) {
// 			console.log('hitting 1');

// 			let { selectedYear, selectedMonth, selectedDay } = this.state;
// 			if (type === DropdownComponent.year) {
// 				selectedYear = value;
// 			} else if (type === DropdownComponent.month) {
// 				selectedMonth = value;
// 			} else if (type === DropdownComponent.day) {
// 				selectedDay = value;
// 			}
// 			console.log('result', selectedYear, selectedMonth, selectedDay);
// 			if (selectedYear !== -1 && selectedMonth !== -1 && selectedDay !== -1) {
// 				this.props.onDateChange(
// 					new Date(selectedYear, selectedMonth, selectedDay)
// 				);
// 			}
// 		}
// 	};

// 	handleYearChange = (e: any) => {
// 		const year = parseInt(e.target.value);
// 		this.setState({ selectedYear: year });
// 		if (this.props.onYearChange) {
// 			this.props.onYearChange(year);
// 		}
// 		this.handleDateChange(DropdownComponent.year, year);
// 	};

// 	handleMonthChange = (e: any) => {
// 		const month = parseInt(e.target.value);
// 		this.setState({ selectedMonth: month });
// 		if (this.props.onMonthChange) {
// 			this.props.onMonthChange(monthByNumber[month]);
// 		}
// 		this.handleDateChange(DropdownComponent.month, month);
// 	};

// 	handleDayChange = (e: any) => {
// 		const day = parseInt(e.target.value);
// 		this.setState({ selectedDay: day });
// 		if (this.props.onDayChange) {
// 			this.props.onDayChange(day);
// 		}
// 		this.handleDateChange(DropdownComponent.day, day);
// 	};

// 	renderYear = () => {
// 		const { classes, ids, names } = this.props;
// 		return (
// 			<div
// 				key="year"
// 				id="dropdown-year"
// 				className={
// 					classes && classes.yearContainer ? classes.yearContainer : undefined
// 				}
// 			>
// 				<select
// 					id={ids && ids.year ? ids.year : undefined}
// 					name={names && names.year ? names.year : undefined}
// 					className={classes && classes.year ? classes.year : undefined}
// 					onChange={this.handleYearChange}
// 					value={this.state.selectedYear}
// 				>
// 					{this.generateYearOptions()}
// 				</select>
// 			</div>
// 		);
// 	};

// 	renderMonth = () => {
// 		const { classes, ids, names } = this.props;
// 		return (
// 			<div
// 				key="month"
// 				id="dropdown-month"
// 				className={
// 					classes && classes.monthContainer ? classes.monthContainer : undefined
// 				}
// 			>
// 				<select
// 					id={ids && ids.month ? ids.month : undefined}
// 					name={names && names.month ? names.month : undefined}
// 					className={classes && classes.month ? classes.month : undefined}
// 					onChange={this.handleMonthChange}
// 					value={this.state.selectedMonth}
// 				>
// 					{this.generateMonthOptions()}
// 				</select>
// 			</div>
// 		);
// 	};

// 	renderDay = () => {
// 		const { classes, ids, names } = this.props;
// 		return (
// 			<div
// 				key="day"
// 				id="dropdown-day"
// 				className={
// 					classes && classes.dayContainer ? classes.dayContainer : undefined
// 				}
// 			>
// 				<select
// 					id={ids && ids.day ? ids.day : undefined}
// 					name={names && names.day ? names.day : undefined}
// 					className={classes && classes.day ? classes.day : undefined}
// 					onChange={this.handleDayChange}
// 					value={this.state.selectedDay}
// 				>
// 					{this.generateDayOptions()}
// 				</select>
// 			</div>
// 		);
// 	};

// 	render = () => {
// 		const { classes } = this.props;
// 		let { order } = this.props;
// 		order = order || [
// 			DropdownComponent.year,
// 			DropdownComponent.month,
// 			DropdownComponent.day,
// 		];
// 		return (
// 			<div
// 				id="dropdown-date"
// 				className={
// 					classes && classes.dateContainer ? classes.dateContainer : undefined
// 				}
// 			>
// 				{order.map((part) => {
// 					return this.renderParts[part]();
// 				})}
// 			</div>
// 		);
// 	};
// }
