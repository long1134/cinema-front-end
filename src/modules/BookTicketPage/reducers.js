import freeze from "deep-freeze"
import { handleActions } from "redux-actions"
import * as actions from "./actions"

export const name = "BookTicketPage"

const intialState = freeze({
  dataTickets: [
    {
      name: "Người lớn",
      count: 0,
      price: 85000,
      total: 0,
    },
    {
      name: "Members",
      count: 0,
      price: 65000,
      total: 0,
    },
    {
      name: "Trẻ em",
      count: 0,
      price: 55000,
      total: 0,
    },
    {
      name: "Sinh viên",
      count: 0,
      price: 55000,
      total: 0,
    },
  ],
  dataCombo: [
    {
      name: "Combo 1",
      detail: "1 Bắp + 1 Nước",
      price: 65000,
      count: 0,
      total: 0,
    },
    {
      name: "Combo 2",
      detail: "1 Bắp + 2 Nước",
      price: 81000,
      count: 0,
      total: 0,
    },
    {
      name: "Family 2 Voucher",
      detail: "2 Bắp + 4 Nước + 1 Snack",
      price: 162000,
      count: 0,
      total: 0,
    },
  ],
  detailTickets: [],
  detailCombo: [],
  detailSeats: [],
  countTickets: 0,
  revenueCombo: 0,
  revenueTickets: 0,
  total: 0,
  map: [],
  mapPay: [],
  bookStep: 1,
  payUrl: "",
  isFinalStep: false,
})

export default handleActions(
  {
    [actions.getDataSuccess]: (state, action) => {
      return freeze({
        ...state,
        ...action.payload,
        map: action.payload.showtimes.map,
        isFinalStep: false,
      })
    },
    [actions.handleBookStep]: (state, action) => {
      return freeze({
        ...state,
        bookStep: action.payload,
      })
    },
    [actions.handleRealTimeMap]: (state, action) => {
      return freeze({
        ...state,
        map: action.payload,
      })
    },
    [actions.handlePaySuccess]: (state, action) => {
      return freeze({
        ...intialState,
        payUrl: action.payload.payUrl,
        isFinalStep: false,
        orderId: Date.now(),
      })
    },
    [actions.handlePreStep]: (state, action) => {
      const map = state.map.map((arr) => arr.map((e) => (e === 2 ? 0 : e)))
      return freeze({
        ...state,
        bookStep: action.payload,
        detailSeats: [],
        map: map,
        mapPay: map,
      })
    },
    [actions.getPaymentUrlSuccess]: (state, action) => {
      return freeze({
        ...state,
        payUrl: "",
      })
    },
    [actions.handleTickets]: (state, action) => {
      console.log(action)
      let oldTickets = [...state.dataTickets]
      let newTickets = []
      oldTickets.map((ticket) => newTickets.push(ticket))
      const { value, index } = action.payload
      let temp = value * newTickets[index].price + newTickets[index].total
      let item = {
        ...newTickets[index],
        count: newTickets[index].count + value >= 0 ? newTickets[index].count + value : 0,
        total: temp >= 0 ? temp : 0,
      }
      newTickets[index] = item
      let detail = []
      newTickets.map((ticket) => {
        if (ticket.count > 0) {
          detail.push({ name: ticket.name, count: ticket.count })
        }
        return ticket
      })
      return freeze({
        ...state,
        dataTickets: [...newTickets],
        detailTickets: detail,
        total: temp >= 0 ? state.total + value * newTickets[index].price : state.total,
        countTickets: temp >= 0 ? state.countTickets + value : state.countTickets,
        revenueTickets:
          temp >= 0 ? state.revenueTickets + value * newTickets[index].price : state.total,
      })
    },
    [actions.handleCombo]: (state, action) => {
      let oldCombo = [...state.dataCombo]
      const { value, index } = action.payload
      const temp = value * oldCombo[index].price + oldCombo[index].total
      let item = {
        ...oldCombo[index],
        count: oldCombo[index].count + value >= 0 ? oldCombo[index].count + value : 0,
        total: temp >= 0 ? temp : 0,
      }
      oldCombo[index] = item
      let detail = []
      oldCombo.map((combo) => {
        if (combo.count > 0) {
          detail.push({ name: combo.name, count: combo.count })
        }
        return combo
      })
      return freeze({
        ...state,
        dataCombo: [...oldCombo],
        detailCombo: detail,
        total: temp >= 0 ? state.total + value * oldCombo[index].price : state.total,
        revenueCombo: temp >= 0 ? state.revenueCombo + value * oldCombo[index].price : state.total,
      })
    },
    [actions.handleSeat]: (state, action) => {
      const { seatNumber, seatName } = action.payload
      const alpha = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "Q",
        "Z",
        "Y",
        "Z",
      ]
      let newSeatDetail = [...state.detailSeats]
      let newMap = [...state.map]
      let mapPay = [...state.map]

      // if you chose more than your countTickets, removing first ticket
      if (
        state.countTickets === state.detailSeats.length &&
        state.detailSeats.length !== 0 &&
        state.detailSeats.indexOf(seatName) === -1
      ) {
        let temp = [...newMap[alpha.indexOf(newSeatDetail[0].substring(0, 1))]]
        temp[newSeatDetail[0].substring(1, newSeatDetail[0].length) - 1] = 0
        newMap[alpha.indexOf(newSeatDetail[0].substring(0, 1))] = temp
        newSeatDetail.splice(0, 1)
        newSeatDetail.push(seatName)
        temp = [...newMap[seatNumber[0]]]
        temp[seatNumber[1]] = 2
        newMap[seatNumber[0]] = temp
        console.log(mapPay)
      } else {
        // push ticket
        if (state.detailSeats.indexOf(seatName) === -1) {
          newSeatDetail.push(seatName)
          let temp = [...newMap[seatNumber[0]]]
          temp[seatNumber[1]] = 2
          newMap[seatNumber[0]] = temp
          console.log(mapPay)
        }
        // remove ticket
        else {
          newSeatDetail.splice(state.detailSeats.indexOf(seatName), 1)
          let temp = [...newMap[seatNumber[0]]]
          temp[seatNumber[1]] = 0
          newMap[seatNumber[0]] = temp
          console.log(temp)
        }
      }
      let demo = newMap.map((arr) => arr.map((e) => (e === 2 ? 1 : e)))
      console.log(demo)
      return freeze({
        ...state,
        map: newMap,
        mapPay: demo,
        detailSeats: newSeatDetail,
      })
    },
  },
  intialState
)
