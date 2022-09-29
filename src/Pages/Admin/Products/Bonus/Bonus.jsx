import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {AdminGetBonus, bonus, changeBonusPint, clearData} from './BonusSLice';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './Bonus.scss'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Bonus() {
    const [order, setOrder] = useState({});
    const [open, setOpen] = useState(false);
    const [changeBonusState, setChangeBonusState] = useState(false);

    const token = localStorage.getItem("ADMIN_TOKEN");

    const bonusMessage = useSelector(((state) => state.userBonus.upDateBonus));
    const getBonus = useSelector(((state) => state.userBonus))

    const dispatch = useDispatch()

    const changeBonus = (e) => {
        setOrder({
            ...order,
            [e.target.name]: e.target.value
        })
    }

    const orderBonus = () => {
        if (order.bonus && order.limit) {
            const values = {
                value: {
                    bonus: order.bonus,
                    limit: order.limit
                },
                token
            }
            dispatch(bonus(values))
        }
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const upDateBonus = () => {
        if (order.bonus || order.limit) {
            const values = {
                value: {
                    bonus: order.bonus,
                    limit: order.limit
                },
                id: getBonus.data.data[0].id,
                token
            }
            dispatch(changeBonusPint(values))
            setChangeBonusState(!changeBonusState)
        }
    }

    useEffect(() => {
        if (bonusMessage.message === "Success") {
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
                setOrder({})
            }, 2000)
        }
    }, [bonusMessage])

    useEffect(() => {
        dispatch(AdminGetBonus(token))
    }, [changeBonusState])

    return (
        <div className='bonus_component'>
            <p className='bonus_info'>Բոնուսային միավորների օգտագործում</p>
            {
                getBonus.data.data && getBonus.data.data.length > 0 ?
                    (<div className='bonus_contaienr'>
                        <div className='bonus'>
                            <label>
                                <p>Բոնուս</p>
                                <input type="number" name='bonus' defaultValue={getBonus.data.data[0].bonus}
                                       placeholder='Bonus' onChange={changeBonus}/>
                            </label>
                        </div>
                        <div className='limit'>
                            <label>
                                <p>Սահման</p>
                                <input type="number" name='limit' defaultValue={getBonus.data.data[0].limit}
                                       placeholder='Limit' onChange={changeBonus}/>
                            </label>
                        </div>
                        <div className='bonus_button'>
                            <button onClick={() => upDateBonus()}>Թարմացնել</button>
                        </div>
                    </div>)
                    : (
                        <div className='bonus_contaienr'>
                            <div className='bonus'>
                                <label>
                                    <p>Բոնուս</p>
                                    <input type="number" name='bonus' placeholder='Bonus' onChange={changeBonus}/>
                                </label>
                            </div>
                            <div className='limit'>
                                <label>
                                    <p>Սահման</p>
                                    <input type="number" name='limit' placeholder='Limit' onChange={changeBonus}/>
                                </label>
                            </div>
                            <div className='bonus_button'>
                                <button onClick={() => orderBonus()}>Պահպանել</button>
                            </div>
                        </div>
                    )}
            <div className='snackbar'>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}>
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity="success" sx={{width: '100%'}}>
                        Բոնուսային համակարգի փոփոխություն կատարվծ է
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default Bonus
