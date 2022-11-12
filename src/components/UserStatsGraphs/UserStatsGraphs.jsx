import React from 'react';
import style from './UserStatsGraphs.module.css';
import { VictoryPie, VictoryChart, VictoryBar } from 'victory';

const UserStatsGraphs = ({ data }) => {

    const [ graph, setGraph ] = React.useState([]);
    const [ total, setTotal ] = React.useState(0);

    React.useEffect(() => {

        const grapData = data.map(item => {
            return {
                x: item.title,
                y: +item.acessos
            }
        });
         
        console.log(data)
        setTotal(
            data
            .map(({ acessos }) => +acessos)
            .reduce((prev, next) => +(prev + next), 0)
        );

        setGraph(grapData);
    }, [data]);

    return (
        <section className={`${style.graph} animateLef`}>
            <div className={`${style.total} ${style.graphItem}`}>
                <p>Access: {total}</p>
            </div>
            <div className={`${style.graphItem}`}>
                <VictoryPie 
                    data={graph} 
                    innerRadius={50} 
                    padding={{ top: 20, bottom: 20, left: 80, right: 80}} 
                    style={{
                        data: {
                            fillOpacity: .9,
                            stroke: '#fff',
                            strokeWidth: 2,
                        },
                        labels: {
                            fontSize: 14,
                            fill: '#444'
                        }
                    }}
                />
            </div>
            <div className={`${style.graphItem}`}>
                <VictoryChart>
                    <VictoryBar alignment="start" data={graph}></VictoryBar>
                </VictoryChart>
            </div>
        </section>
    );
}

export default UserStatsGraphs;
