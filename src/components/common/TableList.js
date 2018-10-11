import React from 'react';
import SkyLight from 'react-skylight';
import moment from 'moment';

import './TableList.css';

class TableList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modelMainItem: [],
            modelSubItem: [],
            remarks: '',
            adminAction: '',
            isApproved: false,
            isAdminRole: this.props.role === 'a' ? true : false,
            role: this.props.role,
            roleName: this.props.role === 'a' ? 'Admin' : 'Patient'
        }

        this.handleUpdate = this.handleUpdate.bind(this);
        this.renderAdminButton = this.renderAdminButton.bind(this);
        this.handleModelOnClick = this.handleModelOnClick.bind(this);
        this.handleViewMoreClose = this.handleViewMoreClose.bind(this);
        this.handleRemarksChange = this.handleRemarksChange.bind(this);
        this.executeAfterModalClose = this.executeAfterModalClose.bind(this);
    }

    executeAfterModalClose() {
        this.setState({ remarks: '' });
    }

    handleViewMoreClose() {
        this.modelPopup.hide();
    }

    handleInputValidation() {
        if (this.state.remarks) {
            return true;
        }
        return false;
    }

    handleUpdate(e) {
        e.preventDefault();

        if (this.handleInputValidation()) {
            const url = 'http://localhost:5000/api/letter/update/' + this.state.modelMainItem._id;
            fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    isApproved: this.state.adminAction === 'Approve' ? true : false,
                    remarks: this.state.remarks
                })

            }).then(() => {
                const url = 'http://localhost:5000/api/letters';
                fetch(url)
                    .then(res => res.json())
                    .then((res) => {
                        this.props.refreshDataList(res);
                    })
                    .catch((err) => console.log(err))
            })
                .catch((err) => console.log(err))

            this.modelPopup.hide();
        }
    }

    handleRemarksChange(e) {
        const re = /^[0-9\b]+$/;

        if (this.state.adminAction === 'Approve') {
            if (e.target.value === '' || re.test(e.target.value)) {
                this.setState({ remarks: e.target.value, isApproved: true });
            }
        } else {
            this.setState({ remarks: e.target.value, isApproved: false });
        }
    }

    handleModelOnClick(item, action) {
        this.setState({
            adminAction: action,
            modelMainItem: item,
            modelSubItem: item.patient,
        });
        this.modelPopup.show();
    }

    renderAdminButton(item) {
        if (this.state.isAdminRole) {
            return <td>
                <button onClick={() => this.handleModelOnClick(item, 'Approve')}>Approve</button>
                <button onClick={() => this.handleModelOnClick(item, 'Reject')}>Reject</button>
            </td>
        } else {
            return <td>
                <button onClick={() => this.handleModelOnClick(item, 'View More')}>View More</button>
            </td>
        }
    }

    render() {
        const listItems = this.props.datatList.map(
            (item) =>
                <tr key={item._id}>
                    <td>{item.patient.name}</td>
                    <td>{item.hospital}</td>
                    <td>{moment(item.created_at).format('DD-MM-YYYY')}</td>
                    <td>{moment(item.date_from).format('DD/MM/YYYY')} to {moment(item.date_to).format('DD/MM/YYYY')}</td>
                    <td>{item.isApproved === null ? 'Pending' : item.isApproved ? 'Approved' : 'Rejected'}</td>
                    {this.renderAdminButton(item)}
                </tr>
        );

        return (
            <div>
                <h3>Letter of Guarantees List</h3>
                <table>
                    <tbody>
                        <tr>
                            <th>Patient Name</th>
                            <th>Hospital</th>
                            <th>Date Created</th>
                            <th>Expected Date Range</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {listItems}
                    </tbody>
                </table>

                <SkyLight hideOnOverlayClicked ref={ref => this.modelPopup = ref} title={this.state.roleName + " Action"} afterClose={this.executeAfterModalClose}>
                    <h3>{this.state.isAdminRole ? "Do you want to " + this.state.adminAction + ' this application?' : 'View More'}</h3>

                    {this.state.isAdminRole ? <AdminModelContent onSubmit={this.handleUpdate}
                        mainItem={this.state.modelMainItem}
                        subItem={this.state.modelSubItem}
                        remarks={this.state.remarks}
                        onChange={this.handleRemarksChange}
                        adminAction={this.state.adminAction} />
                        : <PatientModelContent mainItem={this.state.modelMainItem}
                            subItem={this.state.modelSubItem}
                            onClick={this.handleViewMoreClose} />}
                </SkyLight>
            </div>
        )
    }
}

class PatientModelContent extends React.Component {
    render() {
        return <div>
            <ModelInnerContent innerContentLabel='Patient Name ' innerContent={this.props.subItem.name} />
            <ModelInnerContent innerContentLabel='Hospital' innerContent={this.props.mainItem.hospital} />
            <ModelInnerContent innerContentLabel='Expected Date' innerContent={moment(this.props.mainItem.date_from).format('DD/MM/YYYY') + ' to ' + moment(this.props.mainItem.date_to).format('DD/MM/YYYY')} />
            <ModelInnerContent innerContentLabel='Created Date' innerContent={moment(this.props.mainItem.created_at).format('DD/MM/YYYY')} />
            <ModelInnerContent innerContentLabel='Remarks' innerContent={this.props.mainItem.remarks} />
            <ModelInnerContent innerContentLabel='Application Status' innerContent={this.props.mainItem.isApproved === null ? 'Pending' : this.props.mainItem.isApproved ? 'Approved' : 'Rejected'} />
            <button onClick={this.props.onClick}>Close</button>
        </div>
    }
}

class AdminModelContent extends React.Component {
    render() {
        return <form onSubmit={this.props.onSubmit}>
            <ModelInnerContent innerContentLabel='Patient Name ' innerContent={this.props.subItem.name} />
            <ModelInnerContent innerContentLabel='Hospital' innerContent={this.props.mainItem.hospital} />
            <ModelInnerContent innerContentLabel='Expected Date' innerContent={moment(this.props.mainItem.date_from).format('DD/MM/YYYY') + ' to ' + moment(this.props.mainItem.date_to).format('DD/MM/YYYY')} />
            <ModelInnerContent innerContentLabel='Created Date' innerContent={moment(this.props.mainItem.created_at).format('DD/MM/YYYY')} />
            <div className="modelInnerContentWrap">
                <div className="modelInnerContentLabel">
                        <h4>Remarks</h4>
                </div>
                <div className="modelInnerContent">
                    <input type="text" value={this.props.remarks} onChange={this.props.onChange} />
                </div>
                <div className="modelInnerContentLabel errorMessage">
                    { this.props.adminAction === 'Approve' ? '*Please enter AMOUNT for approval' : '*Please enter REASON of rejection'}
                </div>
            </div>
            <div><button type="submit">{this.props.adminAction}</button></div>
        </form>
    }
}

class ModelInnerContent extends React.Component {
    render() {
        return <div className='modelInnerContentWrap'>
            <div className="modelInnerContentLabel"><h4>{this.props.innerContentLabel}</h4></div>
            <div className="modelInnerContent">{this.props.innerContent ? this.props.innerContent : '--'}</div>
        </div>
    }
}

export default TableList;