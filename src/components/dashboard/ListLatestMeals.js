import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Table} from "antd";

import {fetchLatestMeals} from "../../actions";
import MyIcon from "../common/my-icon";

class MealLatest extends Component {

    componentDidMount() {
        this.props.fetchLatestMeals();
    }

    title = () =>
        <h3>
            <label>
                <MyIcon type="icon-Newlyadded" style={{fontSize: '20px', paddingRight: '4px'}}/>
                Ostatnio dodane posiłki
            </label>
        </h3>;

    render() {
        return <Table className='dashboard__table'
                      locale={{emptyText: 'Nie znaleziono ostatnich posiłków'}}
                      loading={!this.props.latestMeals}
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
                      }]} dataSource={this.props.latestMeals} size="middle"/>
    }
}

const mapStateToProps = ({meals}) => {
    return {
        latestMeals: meals.latestMeals
    }
};

export default connect(mapStateToProps, {fetchLatestMeals})(MealLatest);