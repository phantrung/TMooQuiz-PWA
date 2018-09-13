/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 8/4/18
 * Time: 8:29 PM
 */
// import React from 'react'

export const router = {
    home : {
        path : '/',
        component : ()=>import(/* webpackChunkName: "Home"*/'../App/TMooQuiz/Home')
    },
}