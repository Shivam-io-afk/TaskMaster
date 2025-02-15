import '../App.css';
import { FaSearch } from 'react-icons/fa';

const subsection = () => {
    return (
        <div className="midBanner">
            <div className='container_left'>
                <table>
                    <tr>
                        <th>Priority</th>
                        <td><span className='tfcs'>Medium</span></td>
                    </tr>
                    <tr>
                        <th>Due Date</th>
                        <td className='dt_org'>28 Feb 2025</td>
                    </tr>
                    <tr>
                        <th>Tags</th>
                        <td class="tags">
                            <span class="meetings">Meetings</span>
                            <span class="ui-design">UI Design</span>
                            <span class="development">Development</span>
                            <span class="ux-research">UX Research</span>
                        </td>
                    </tr>
                    {/* <tr>
                        <th>Assignees</th>
                        <td class="assignees">
                            <span>Alpha</span>
                            <span>Studio</span>
                            <span>+2 more</span>
                        </td>
                    </tr> */}
                </table>
            </div>
            <div className='container_right'>
                <div className='input_area'>
                    <input type='text' placeholder='Search Tasks'/>
                    <FaSearch className='incs'/>
                </div>
            </div>
        </div>
    );
}

export default subsection;