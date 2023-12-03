import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Table = () => {

    const[data, setData] = useState([])
    const [cards, setCards] = useState([])
    const [cards2, setCards2] = useState([])
    const [cardValuePl1, setCardValuePl1] = useState(0)
    const [cardValuePl2, setCardValuePl2] = useState(0)
    const [difference, setDifference] = useState(0)
    const [difference2, setDifference2] = useState(0)


    async function getDeck() {
        const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle?count=1?shuffled=true')
        setData(response.data)
    }

    async function drawCards() {
        const responsePl1 = await axios.get(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=2`)
        const responsePl2 = await axios.get(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=2`)
        try {
            setCards(responsePl1.data.cards)
            setCards2(responsePl2.data.cards)
        } catch (error) {
            console.log(error);
        }

        let scoreCard1Pl1 = responsePl1.data.cards[0].value
        let scoreCard2Pl1 = responsePl1.data.cards[1].value
        let scoreCard1Pl2 = responsePl2.data.cards[0].value
        let scoreCard2Pl2 = responsePl2.data.cards[1].value


        if (scoreCard1Pl1 === "JACK") {
            scoreCard1Pl1 = '11'
        } else if(scoreCard1Pl1 === "QUEEN") {
            scoreCard1Pl1 = '12'
        } else if(scoreCard1Pl1 === "KING") {
            scoreCard1Pl1 = '13'
        } else if(scoreCard1Pl1 === "ACE") {
            scoreCard1Pl1 = '14'
        }

        if (scoreCard2Pl1 === "JACK") {
            scoreCard2Pl1 = '11'
        } else if(scoreCard2Pl1 === "QUEEN") {
            scoreCard2Pl1 = '12'
        } else if(scoreCard2Pl1 === "KING") {
            scoreCard2Pl1 = '13'
        } else if(scoreCard2Pl1 === "ACE") {
            scoreCard2Pl1 = '14'
        }

        if (scoreCard1Pl2 === "JACK") {
            scoreCard1Pl2 = '11'
        } else if(scoreCard1Pl2 === "QUEEN") {
            scoreCard1Pl2 = '12'
        } else if(scoreCard1Pl2 === "KING") {
            scoreCard1Pl2 = '13'
        } else if(scoreCard1Pl2 === "ACE") {
            scoreCard1Pl2 = '14'
        }

        if (scoreCard2Pl2 === "JACK") {
            scoreCard2Pl2 = '11'
        } else if(scoreCard2Pl2 === "QUEEN") {
            scoreCard2Pl2 = '12'
        } else if(scoreCard2Pl2 === "KING") {
            scoreCard2Pl2 = '13'
        } else if(scoreCard2Pl2 === "ACE") {
            scoreCard2Pl2 = '14'
        }

        let scorePl1 = Number(scoreCard1Pl1) + Number(scoreCard1Pl2)
        let scorePl2 = Number(scoreCard1Pl2) + Number(scoreCard2Pl2)

        setCardValuePl1(scorePl1)
        setCardValuePl2(scorePl2)

        let df1 = 21 - scorePl1
        let  df2 = 21 - scorePl2

        if (df1 < 0) {
            setDifference(df1 * (-1))
        }else {
            setDifference((df1))
        }
        if (df2 < 0) {
            setDifference2(df2 * (-1))
        } else {
            setDifference2(df2)
        }

        //
        // setDifference(21 - scorePl1)
        // setDifference2(21 - scorePl2)



    }

    function setVictoryRound() {
        if (difference < difference2) {
            alert('pl1')
        }
        
        if (difference > difference2) {
            alert('pl2')
        }

        console.log(difference)
        console.log(difference2)
    }

    useEffect(() => {
        getDeck()
    }, [])

    return (
        <div>
            <div>{data.deck_id}</div>
            <div>
                <button onClick={drawCards}>Получить карты</button>
                <button onClick={setVictoryRound}>Узнать победителя</button>
            </div>
            <div>{cardValuePl1}</div>
            <div>{cardValuePl2}</div>
            <div>
                {cards.map((item, idx) => <img key={idx} src={item.image} alt="" />)}
                {cards2.map((item, idx) => <img key={idx} src={item.image} alt="" />)}
            </div>
        </div>
    )
}

export default Table