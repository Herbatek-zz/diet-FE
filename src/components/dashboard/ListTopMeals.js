import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Table} from "antd";

import {fetchTopMeals} from "../../actions";
import MyIcon from "../common/my-icon";

class MealTop extends Component {

    componentDidMount() {
        this.props.fetchTopMeals();
    }

    title = () =>
        <h3>
            <label>
                <MyIcon type="icon-rank" style={{fontSize: '20px', paddingRight: '4px'}}/>
                Ranking posiłków
            </label>
        </h3>;

    render() {
        return (
            <Table className='dashboard__table'
                   locale={{emptyText: 'Nie znaleziono najlepszych posiłków'}}
                   loading={!this.props.topMeals}
                   showHeader={false}
                   title={this.title}
                   bordered={false}
                   pagination={false}
                   rowKey='id'
                   dataSource={this.props.topMeals}
                   size='middle'
                   columns={[{
                       title: 'Nazwa', dataIndex: 'name',
                       render: (text, record, index) =>
                           <Link to={`/meals/${record.id}`} className='top-table__text'>
                               {index === 0 ?
                                   <MyIcon type="icon-rankedfirst" className='top-list__icon top-list__icon--first'/>
                                   : index === 1 ?
                                       <MyIcon type="icon-rankedfirst" className='top-list__icon top-list__icon--second'/>
                                       : index === 2 ?
                                           <MyIcon type="icon-rankedfirst" className='top-list__icon top-list__icon--third'/>
                                           : `${++index}.`}{text}
                           </Link>
                   }]}/>
        )
    }
}

const mapStateToProps = ({meals}) => {
    return {
        topMeals: meals.top
    }
};

export default connect(mapStateToProps, {fetchTopMeals})(MealTop);