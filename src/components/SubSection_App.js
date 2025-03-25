import '../App.css';
import { FaSearch } from 'react-icons/fa';
import colors from './Json/colors.json';

const subsection = (fromparent) => {
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const shuffledColors = shuffleArray([...colors.colors]);

    const getUniqueColor = (index) => {
        return shuffledColors[index % shuffledColors.length];
    };

    return (
        <div className="midBanner">
            <div className='container_left'>
                <table>
                    <tr>
                        <th>Priority</th>
                        <td><span className={'tfcs ' + fromparent.data.priority}>{fromparent.data.priority}</span></td>
                    </tr>
                    <tr>
                        <th>Due Date</th>
                        <td className='dt_org'>{fromparent.data.duedate}</td>
                    </tr>
                    <tr>
                        <th>Tags</th>
                        <td className="tags">
                            {fromparent.data.tags.map((val, keys) => (
                                <span
                                    key={keys}
                                    className={val}
                                    style={{ backgroundColor: getUniqueColor(keys) }}
                                >
                                    {val}
                                </span>
                            ))}
                        </td>
                    </tr>
                    <tr>
                        <th>Assignees</th>
                        <td className="assignees">
                            {
                            fromparent.data.team.map((val, keys) => (
                                <span key={keys}>{val}</span>
                            ))
                            }
                        </td>
                    </tr>
                </table>
            </div>
            <div className='container_right'>
                <div className='input_area'>
                    <input type='text' placeholder='Search Tasks' />
                    <FaSearch className='incs' />
                </div>
            </div>
        </div>
    );
};

export default subsection;