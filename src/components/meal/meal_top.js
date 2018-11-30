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
        return <Table className='dashboard__table'
                      locale={{emptyText: 'Nie znaleziono najlepszych posiłków'}}
                      loading={!this.props.topMeals}
                      showHeader={false}
                      title={this.title}
                      bordered={false}
                      pagination={false}
                      rowKey='id'
                      columns={[{
                          title: 'Nazwa', dataIndex: 'name',
                          render: (text, record, index) =>
                              <Link style={{color: 'black'}} to={`/meals/${record.id}`}>
                                  {++index}. {text}
                              </Link>
                      }]} dataSource={this.props.topMeals} size="middle"/>
    }
}

const mapStateToProps = ({meals}) => {
    return {
        topMeals: meals.top
    }
};

export default connect(mapStateToProps, {fetchTopMeals})(MealTop);