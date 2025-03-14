import '../App.css';
import { FaSearch } from 'react-icons/fa';

const subsection = (fromparent) => {
    return (
        <div className="midBanner">
            <div className='container_left'>
                <table>
                    <tr>
                        <th>Priority</th>
                        <td><span className='tfcs'>{fromparent.data.priority}</span></td>
                    </tr>
                    <tr>
                        <th>Due Date</th>
                        <td className='dt_org'>{fromparent.data.duedate}</td>
                    </tr>
                    <tr>
                        <th>Tags</th>
                        <td className="tags">
                            {
                                fromparent.data.alltags.map((val, keys) => (
                                    <span key={keys} className={val}>{val}</span>
                                ))
                            }
                        </td>
                    </tr>


                    {/* Have to work here */}
                    <tr>
                        <th>Assignees</th>
                        <td class="assignees">
                            {
                                fromparent.data.assign.map((val, keys) => (
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
}

export default subsection;