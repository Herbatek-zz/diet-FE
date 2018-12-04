import React from 'react';
import {Progress} from "antd";


const ProgressBars = (props) => {
    const {cart} = props;

    return (
        cart.targetUserCalories ?
            <div className='third-section__wrapper'>
                <div className='third-section__calories'>
                    <div className='progress__wrapper'>
                        <label className='third-section__calories-title'><b>Kalorie</b></label>
                        <Progress type="dashboard"
                                  width={150}
                                  percent={cart.kcal === undefined || cart.kcal === 0 ? 0 : Number(((cart.kcal / cart.targetUserCalories) * 100).toFixed(1))}
                                  status={cart.kcal > cart.targetUserCalories ? "exception" : cart.kcal === cart.targetUserCalories ? "success" : "active"}/>
                        <label>{cart.kcal} kcal / {cart.targetUserCalories} kcal</label>
                    </div>
                </div>
                <div className='third-section__macro'>
                    <div className='progress__wrapper'>
                        <label className='third-section__macro-title'><b>Tłuszcze</b></label>
                        <Progress type="circle"
                                  width={80}
                                  status={cart.fat > cart.targetUserFat ? "exception" : cart.fat === cart.targetUserFat ? "success" : "active"}
                                  percent={cart.fat === undefined || cart.fat === 0 ? 0 : Number(((cart.fat / cart.targetUserFat) * 100).toFixed(1))}/>
                        <label> {cart.fat} g / {cart.targetUserFat} g</label>
                    </div>
                    <div className='progress__wrapper'>
                        <label className='third-section__macro-title'><b>Białko</b></label>
                        <Progress type="circle"
                                  width={80}
                                  status={cart.protein > cart.targetUserProtein ? "exception" : cart.protein === cart.targetUserProtein ? "success" : "active"}
                                  percent={cart.protein === undefined || cart.protein === 0 ? 0 : Number(((cart.protein / cart.targetUserProtein) * 100).toFixed(1))}/>
                        <label> {cart.protein} g / {cart.targetUserProtein} g</label>
                    </div>
                    <div className='progress__wrapper'>
                        <label className='third-section__macro-title'><b>Węglowodany</b></label>
                        <Progress type="circle"
                                  width={80}
                                  status={cart.carbohydrate > cart.targetUserCarbohydrate ? "exception" : cart.carbohydrate === cart.targetUserCarbohydrate ? "success" : "active"}
                                  percent={cart.carbohydrate === undefined || cart.carbohydrate === 0 ? 0 : Number(((cart.carbohydrate / cart.targetUserCarbohydrate) * 100).toFixed(1))}/>
                        <label>{cart.carbohydrate} g / {cart.targetUserCarbohydrate} g</label>
                    </div>
                </div>
            </div> :
            <p className='text-info'>Aby zobaczyć informacje o spożytym jedzeniu musisz
                uzupełnić <b>profil</b> i/lub dodać do koszyka <b>posiłek</b> lub <b>produkt</b>
            </p>
    )
};

export default ProgressBars;