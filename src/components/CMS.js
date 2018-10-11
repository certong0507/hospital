import React from 'react';
import SkyLight from 'react-skylight';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import TableList from './common/TableList';
import 'react-datepicker/dist/react-datepicker.css';
import './CMS.css';

class CMS extends React.Component {

   constructor(props) {
      super(props);

      const loginInfo = this.props.location.state.loginInfoObj[0];

      this.state = {
         role: loginInfo.role,
         dataList: [],
         patientId: loginInfo._id,
         hospital: 'Hospital A',
         dateFrom: moment(),
         dateTo: moment()
      }

      this.initDataList = this.initDataList.bind(this);
      this.refreshDataList = this.refreshDataList.bind(this);
      this.handleApply = this.handleApply.bind(this);
      this.handleLogOut = this.handleLogOut.bind(this);
      this.handleDateToChange = this.handleDateToChange.bind(this);
      this.handleDateFromChange = this.handleDateFromChange.bind(this);
      this.handleHospitalChange = this.handleHospitalChange.bind(this);
      this.handleApplyModelOnClick = this.handleApplyModelOnClick.bind(this);
   }

   refreshDataList(updatedList){
      this.setState({ dataList: updatedList });
}

   initDataList() {
      let url = '';
      const loginInfoObj = this.props.location.state.loginInfoObj[0];

      // 'p' for Patient, 'a' for Admin
      if (loginInfoObj.role === 'p')
         url = 'http://localhost:5000/api/letters/' + loginInfoObj._id;
      else
         url = 'http://localhost:5000/api/letters/';

      fetch(url)
         .then(res => res.json())
         .then((json) => {
            this.setState({
               dataList: json
            })
            console.log(this.state.dataList);
         })
         .catch(err => console.log(err))
   }

   initUserRole(role) {
      if (role === 'p')
         return 'Patient';
      else
         return 'Admin'
   }

   handleDateFromChange(date) {
      this.setState({
         dateFrom: date
      });
   }

   handleDateToChange(date) {
      this.setState({
         dateTo: date
      });
   }

   handleApply(e) {
      e.preventDefault();
      const url = 'http://localhost:5000/api/letter';

      fetch(url, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            patient_id: this.state.patientId,
            hospital: this.state.hospital,
            date_from: this.state.dateFrom,
            date_to: this.state.dateTo,
            isApproved: null
         })
      }).then(() => {
         this.initDataList();
      }).catch(err => console.log(err))

      this.applyModelPopup.hide();
   }

   handleApplyModelOnClick() {
      this.applyModelPopup.show();
   }

   handleLogOut() {
      this.props.history.push('/');
   }

   handleHospitalChange(e) {
      this.setState({ hospital: e.target.value })
   }

   componentDidMount() {
      this.initDataList();
   }

   render() {
      return (
         <div>
            <h2>{this.initUserRole(this.state.role)} CMS</h2>

            <TableList datatList={this.state.dataList} role={this.state.role} refreshDataList={this.refreshDataList} />

            {this.state.role === 'p' ? <ApplyButton onApplyClick={this.handleApplyModelOnClick} /> : null}

            <button onClick={this.handleLogOut}>Log Out</button>

            <SkyLight hideOnOverlayClicked ref={ref => this.applyModelPopup = ref} title="Letter of Guarantee" afterClose={this.executeAfterModalClose}>
               Apply Letter of Guarantee
               <form onSubmit={this.handleApply}>
                  <div className="modelInnerContentWrap">
                        <div className="modelInnerContentLabel">
                              <h4>Hospital</h4>
                        </div>
                        <div className="modelInnerContent">
                              <select className="applyInput" name="hospital" value={this.state.hospital} onChange={this.handleHospitalChange}>
                                    <option value="Hospital A">Hospital A</option>
                                    <option value="Hospital B">Hospital B</option>
                                    <option value="Hospital C">Hospital C</option>
                              </select>
                        </div>
                  </div>
                  
                  <div className="modelInnerContentWrap">
                        <div className="modelInnerContentLabel">
                              <h4>Expected Date From</h4>
                        </div>
                        <div className="modelInnerContent">
                              <DatePicker
                                    className="applyInput"
                                    selected={this.state.dateFrom}
                                    onChange={this.handleDateFromChange} />
                        </div>
                  </div>

                  <div className="modelInnerContentWrap">
                        <div className="modelInnerContentLabel">
                              <h4>Expected Date To</h4>
                        </div>
                        <div className="modelInnerContent">
                              <DatePicker
                                    className="applyInput"
                                    selected={this.state.dateTo}
                                    onChange={this.handleDateToChange} />
                        </div>
                  </div>
                  <button type="submit">Apply</button>
                  
               </form>
            </SkyLight>
         </div>
      )
   }
}

class ApplyButton extends React.Component {
   render() {
      return <button onClick={this.props.onApplyClick}>Apply Letter of Guarantee</button>
   }
}

export default CMS;