import { Router } from 'express';
const router = Router();
import { MybatisMapper, connection, MapperPath, format } from '../../mysql/mysql.js';
require('dotenv').config();

MybatisMapper.createMapper([`${MapperPath}/cart/CartMapper.xml`]);
router.post('/addGoodsCart', async (req, res) => {
    const reqData = req.body;
    const query = MybatisMapper.getStatement('cartMapper', 'addGoodsCart', reqData, format);
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(500);
        }

        console.log(results);
        return res.status(200).send({
            results
        });
    });
});

router.get('/getCartList/:user_id', async (req, res) => {
    let reqData;
    if (req.params.user_id != null) {
        reqData = req.params;
    } else {
        reqData = req.params.user_id = null;
    }
    console.log('reqData : ', reqData);

    const query = MybatisMapper.getStatement('cartMapper', 'getCartList', reqData, format);
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(500);
        }
        console.log(results);
        return res.status(200).send({
            results
        });
    });
});

router.post('/deleteCart', async (req, res) => {
    const reqData = req.body;
    if(req.body == null || req.body.USER_ID == '' || req.body.CART_NUM == ''){
        return res.status(400).send({
            msg : 'Bad Request Data'
        });
    }
        const query = MybatisMapper.getStatement('cartMapper', 'deleteCart', reqData, format);
        connection.query(query, (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(500);
            }
            console.log(results);
            return res.status(200).send({
                msg: 'deleteCart'
            });
        });

    
});

router.post('/insertOrder', async (req, res) => {
    const reqData = req.body;
    if (req.body == null || req.body.USER_ID == '' || req.body.ORDER_RECIEVE == '') {
        return res.status(400).send({
            msg: 'Bad Request Data'
        });
    }
    console.log(reqData);
    
    const query = MybatisMapper.getStatement('cartMapper', 'orderInfo', reqData, format);
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(500);
        }

        
        // return res.status(200).send({
        //     results
        // });
    });
    //console.log(results);
    //order detail
    const query2 = MybatisMapper.getStatement('cartMapper', 'orderInfo_Details', reqData, format);
    connection.query(query2, (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(500);
        }
        // return res.status(200).send({
        //     results
        // });
    });

    for (let i = 0; i < reqData.ITEM.length; i++) {
        let data = reqData.ITEM[i];
        const query3 = MybatisMapper.getStatement('cartMapper', 'updateGoodsStock', data, format);
        connection.query(query3, (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(500);
            }
            // return res.status(200).send({
            //     results
            // });
        });
     }
     let resData = [];
    for (let i = 0; i < reqData.ITEM.length; i++) {
        console.log(reqData.ITEM[i]);
        
    const query4 = MybatisMapper.getStatement('cartMapper', 'deleteCart', reqData.ITEM[i], format);
    connection.query(query4, (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(500);
        }
        resData.push(results);
    });
        return res.status(200).send({
            resData
        });
}
});

router.post('/getOrderList', async (req, res) => {
    if (req == null || req.params == '') {
        return res.status(400).send({
            msg: 'Bad Request Data'
        });
    }
    const reqData = req.body;
    

    console.log(reqData);
    const query = MybatisMapper.getStatement('cartMapper', 'getOrderList', reqData, format);
    connection.query(query, (error, results1, fields) => {
        if (error) {
            console.log(error);
            return res.status(500);
        }
        const query1 = MybatisMapper.getStatement('cartMapper', 'getOrderListCount', reqData, format);
        connection.query(query1, (error, results2, fields) => {
            if (error) {
                console.log(error);
                return res.status(500);
            }
            return res.status(200).send({
                results1,
                results2
            });
        });
    });

    
});

router.post('/updateOrderList', async (req, res) => {
    if (req == null || req.params == '') {
        return res.status(400).send({
            msg: 'Bad Request Data'
        });
    }
    const reqData = req.body;


    console.log(reqData);
    for(let i = 0; i < reqData.length; i++){
        const query = MybatisMapper.getStatement('cartMapper', 'updateOrderList', reqData[i], format);
        connection.query(query, (error, results1, fields) => {
            if (error) {
                console.log(error);
                return res.status(500);
            }
            
        });
    }
    
    return res.status(200).send({
        msg:'업데이트 완료'
    });

});

router.post('/deleteOrderList', async (req, res) => {
    if (req == null || req.params == '') {
        return res.status(400).send({
            msg: 'Bad Request Data'
        });
    }
    const reqData = req.body;


    console.log(reqData);
    for (let i = 0; i < reqData.length; i++) {
        const query = MybatisMapper.getStatement('cartMapper', 'deleteOrderList', reqData[i], format);
        connection.query(query, (error, results1, fields) => {
            if (error) {
                console.log(error);
                return res.status(500);
            }

        });
    }

    return res.status(200).send({
        msg: '삭제 완료'
    });

});



// function updateGoodsStock(reqData){
//     const query = MybatisMapper.getStatement('cartMapper', 'updateGoodsStock', reqData, format);
//     connection.query(query, (error, results, fields) => {
//         if (error) {
//             console.log(error);
//             return res.status(500);
//         }

//         console.log(results);
//         return res.status(200).send({
//             results
//         });
//     });
// }

export default router;