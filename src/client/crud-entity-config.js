import React from 'react'
import LongText from './components/longtext'
import { formatDate } from './utils/date-util'
import ResendInvoice from './containers/resendInvoice'
import MarkInvoiceAsPaid from './containers/markInvoiceAsPaid'
import InvoiceHeader from './containers/invoiceHeader'
import { Button, Select, Icon, Tooltip } from 'antd'
import BillTo from './containers/bill-to'
import { ModalTrigger } from 'core-components/modal'
import Print from './components/print'
import { getAllISOCodes } from 'iso-country-currency'
import { nFormatter } from './utils/common'
const { Option } = Select
const users = {
	entityName: 'Users',
	entity: 'users',
	displayType: 'card',
	role: 'admin',
	pagination: {
		type: 'server',
	},
	defaultSort: {
		sort: 'createdAt',
		sortType: 'desc',
	},
	shouldShowActions: ({ sharedState }) => {
		return (text, row, markup) => {
			const { auth } = sharedState.firebase
			return auth && auth.uid === row.uid ? <p>You</p> : markup
		}
	},
	reducer: {
		stateKeys: ['firebase'],
	},
	recordKey: 'uid',
	search: {
		filters: [
			{
				title: 'Name',
				type: 'input',
				key: 'displayName',
			},
			{
				title: 'Email Address',
				type: 'input',
				key: 'email',
			},
		],
		searchOnSubmit: true,
	},
	columns: [
		{
			title: 'Name',
			dataIndex: 'displayName',
			width: 250,
		},
		{
			title: 'Email',
			dataIndex: 'email',
			width: 250,
		},
		{
			title: 'Last Signed In',
			dataIndex: 'metadata.lastSignInTime',
			width: 200,
		},
		{
			title: 'Created At',
			dataIndex: 'metadata.creationTime',
			render: (createdAt) => {
				return <p>{formatDate(createdAt)}</p>
			},
			width: 250,
		},
	],
	rowActions: [],
	actionsWidth: 230, // Width of actions column (which contains edit,delete button etc.
	formId: 'UserForm',
}

const invoice = {
	entityName: 'Invoices',
	entity: 'invoice',
	deleteAction: false,
	search: {
		filters: [
			{
				title: 'Invoice Number',
				type: 'input',
				key: 'id',
			},
			{
				title: 'Is Paid',
				type: 'select',
				key: 'isPaid',
				options: ['Yes', 'No'].map((item, index) => {
					return (
						<Option key={index} value={(item === 'Yes').toString()}>
							{item}
						</Option>
					)
				}),
			},
			{
				title: 'Customer Name',
				type: 'input',
				key: 'customerName',
			},
			{
				title: 'Contact Number',
				type: 'input',
				key: 'mobileNumber',
			},
			{
				title: 'Invoice Date',
				type: 'date',
				key: 'createdDate',
			},
		],
		searchOnSubmit: true,
	},
	defaultSort: {
		sort: 'timestamp',
		sortType: 'desc',
	},
	columns: ({ sharedState }) => {
		const { config } = sharedState || {}
		const { configuration } = config || {}
		const { CURRENCY } = configuration || {}
		const { symbol } =
			getAllISOCodes().find((item) => {
				return item.currency === CURRENCY
			}) || {}
		return [
			{
				title: 'Invoice Number',
				dataIndex: 'id',
			},
			{
				title: 'Date',
				dataIndex: 'date',
				render: (date) => <p>{formatDate(date, 'DD/MM/YYYY')}</p>,
			},
			{
				title: 'Invoice Amount',
				render: ({ labourTransportCosts, parts }) => {
					let cost = 0
					if (labourTransportCosts && !isNaN(labourTransportCosts)) {
						cost = cost + parseFloat(labourTransportCosts)
					}
					;(parts || []).forEach((part) => {
						const { partCost } = part
						if (partCost && !isNaN(partCost)) {
							cost = cost + parseFloat(partCost)
						}
					})
					return <p>{symbol + nFormatter(cost)}</p>
				},
			},
			{
				title: 'Customer Name',
				dataIndex: 'customer',
				render: (customer, { customerName }) => {
					if (typeof customer === 'object') {
						customer = customer.customerName
					} else {
						customer = customerName
					}
					return <p>{customer}</p>
				},
			},
			{
				title: 'Is Paid',
				dataIndex: 'payment',
				render: (payment) => {
					return <p>{!!payment ? 'Paid' : 'Not Paid'}</p>
				},
			},
		]
	},
	pagination: {
		type: 'server',
	},
	headerActions: [InvoiceHeader],
	rowActions: [
		MarkInvoiceAsPaid,
		ResendInvoice,
		({ record }) => {
			const { key, customer, date, parts, labourTransportCosts } = record
			const total =
				(parts || []).reduce((sum, part) => {
					const { partCost } = part
					return (sum = sum + partCost)
				}, 0) + (labourTransportCosts || 0)
			return (
				<Print
					template="invoice"
					data={{
						invoiceKey: key,
						...record,
						customer:
							typeof customer === 'string'
								? {
										...record,
										customerKey: customer,
								  }
								: customer,
						invoiceKey: record.key,
						date: formatDate(date, 'DD-MM-YYYY'),
						total,
					}}
				/>
			)
		},
		(props) => {
			const { record } = props
			return (
				<ModalTrigger
					content={<BillTo record={record} />}
					modalProps={{
						title: 'Bill To',
						footer: null,
					}}
				>
					<Tooltip placement="top" title={'Send To'}>
						<Button className="btn light-blue-btn-text">
							<Icon type="idcard" />
						</Button>
					</Tooltip>
				</ModalTrigger>
			)
		},
	],
	reducer: {
		stateKeys: ['config'],
	},
}
const customer = {
	entity: 'customer',
	entityName: 'Customers',
	formId: 'CustomerForm',
	defaultSort: {
		sort: 'createdAt',
		sortType: 'desc',
	},
	pagination: {
		type: 'server',
	},
	search: {
		filters: [
			{
				title: 'Name',
				type: 'input',
				key: 'customerName',
			},
			{
				title: 'Mobile Number',
				type: 'input',
				key: 'key',
			},
		],
		searchOnSubmit: true,
	},
	columns: [
		{
			title: 'Customer Name',
			dataIndex: 'customerName',
		},
		{
			title: 'Email',
			dataIndex: 'email',
		},
		{
			title: 'Mobile Number',
			dataIndex: 'key',
		},
	],
}
const template = {
	entity: 'email-template',
	entityName: 'Email Templates',
	selection: false,
	defaultSort: {
		sort: 'createdAt',
		sortType: 'desc',
	},
	//addAction : false,
	deleteAction: false,
	columns: [
		{
			title: 'Code',
			dataIndex: 'key',
		},
		{
			title: 'Subject',
			dataIndex: 'subject',
		},
	],
	formId: 'TemplateForm',
	pagination: {
		type: 'server',
	},
	search: {
		filters: [
			{
				title: 'Code',
				type: 'input',
				key: 'key',
			},
		],
		searchOnSubmit: true,
	},
}
const configuration = {
	entityName: 'Configurations',
	entity: 'configuration',
	selection: false,
	addAction: false,
	defaultSort: {
		sort: 'createdAt',
		sortType: 'desc',
	},
	deleteAction: false,
	pagination: {
		type: 'server',
	},
	selection: false,
	columns: [
		{
			dataIndex: 'key',
			title: 'Key',
		},
		{
			title: 'Type',
			dataIndex: 'type',
		},
		{
			title: 'Value',
			dataIndex: 'value',
			render: (value, { type }) => {
				return type === 'file' ? (
					<div>
						<a target="_blank" href={value}>
							Download
						</a>
						<div className="image">
							<img src={value} />
						</div>
					</div>
				) : (
					<div>{value}</div>
				)
			},
		},
		{
			title: 'Description',
			dataIndex: 'description',
		},
	],
	search: {
		filters: [
			{
				title: 'Key',
				type: 'input',
				key: 'key',
			},
		],
		searchOnSubmit: true,
	},
	formId: 'ConfigurationForm',
}
const pdfTemplate = {
	entity: 'pdf-template',
	entityName: 'PDF Templates',
	addAction: false,
	defaultSort: {
		sort: 'createdAt',
		sortType: 'desc',
	},
	deleteAction: false,
	selection: false,
	formId: 'PdfTemplateForm',
	pagination: {
		type: 'server',
	},
	search: {
		filters: [
			{
				title: 'Name',
				type: 'input',
				key: 'name',
			},
		],
		searchOnSubmit: true,
	},
	columns: [
		{
			title: 'Name',
			dataIndex: 'name',
		},
	],
}
const gateway = {
	entity: 'gateway',
	entityName: 'Payment Gateways',
	addAction: false,
	deleteAction: false,
	selection: false,
	formId: 'GatewayForm',
	search: false,
	columns: [
		{
			title: 'Gateway ID',
			dataIndex: 'key',
		},
	],
}

const contact = {
	entityName: 'Enquiries',
	entity: 'contact',
	role: 'admin',
	// deleteAction: false,
	pagination: {
		type: 'server',
	},
	selection: true,
	columns: [
		{
			title: 'Email',
			dataIndex: 'email',
		},
		{
			title: 'Name',
			dataIndex: 'name',
		},
		{
			title: 'Message',
			dataIndex: 'message',
			render: (message) => {
				return <LongText text={message} limit={25} title="Message" />
			},
		},
	],
	search: {
		filters: [
			{
				title: 'Name',
				type: 'input',
				key: 'name',
			},
			{
				title: 'Email',
				type: 'input',
				key: 'email',
			},
			{
				title: 'Message',
				type: 'input',
				key: 'message',
			},
		],
		searchOnSubmit: true,
	},
}
const config = {
	users,
	invoice,
	customer,
	gateway,
	configuration,
	'email-template': template,
	'pdf-template': pdfTemplate,
	contact,
}
export default config
export const routes = {
	...config,
}
