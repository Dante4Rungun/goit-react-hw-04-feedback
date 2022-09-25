import React from "react";
import { useState } from "react";
import styled from "./Section.module.css"
import { Statistics } from "components/Statistics/Statistics";
import { FeedbackOption } from "components/FeedbackOptions/FeedbackOptions";
import { Notification } from "components/Notification/Notification";
import PropTypes from 'prop-types';
import { useEffect } from "react";

export const Section = ({title}) => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)
    const [positivePerc,setPositivePerc] = useState(0)

    const setFeedbackValue = (name) => {
        if (name === "good") {
            setGood(good + 1)
        }
        if (name === "neutral") {
            setNeutral(neutral + 1)
        }
        if (name === "bad") {
            setBad(bad + 1)
        }
    }

    const onLeaveFeedback = event => {
        const { name } = event.target
        setFeedbackValue(name)
    }

    useEffect(() => {
        setTotal(bad+neutral+good)
        setPositivePerc(Math.floor((good/(good+neutral+bad))*100))
    },[bad,neutral,good])
     
    return (
        <section className={styled.feedback}>
            <p className={styled.feedback__title}>{title}</p>
            <FeedbackOption options={['good', 'neutral', 'bad']} onLeaveFeedback={onLeaveFeedback} />
            {(good + neutral + bad) > 0 ? (
                <Statistics good={good} neutral={neutral} bad={bad} total={total} positivePercentage={positivePerc} />  
            ) : (
                <Notification message = {'No feedback given'} />
            )}
        </section>
    )
}

Section.propTypes = {
    title: PropTypes.string
}