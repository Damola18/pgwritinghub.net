import React from 'react'
import styled from 'styled-components'

const Schedule = () => {
  return (
      <Container>
          <table>
              <thead>
                  <tr>
                      <th>Week</th>
                      <th>Date ({new Date().getFullYear()})</th>
                      <th>Time (GMT)</th>
                      <th>Topic</th>
                      <th>Lecturer</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>1</td>
                      <td>June 2</td>
                      <td>9-11 am</td>
                      <td>Elements of a scientific argument</td>
                      <td>Dr Peter Elias</td>
                  </tr>
                  <tr>
                      <td>2</td>
                      <td>June 9</td>
                      <td>9-11 am</td>
                      <td>Critical thinking and writing</td>
                      <td>Dr Temilade Sesan</td>
                  </tr>
                  <tr>
                      <td>3</td>
                      <td>June 16</td>
                      <td>9-11 am</td>
                      <td>Theoretical frameworks</td>
                      <td>Dr Kareem Buyana</td>
                  </tr>
                  <tr>
                      <td>4</td>
                      <td>June 23</td>
                      <td>9-11 am</td>
                      <td>Thematic analysis</td>
                      <td>Dr Temilade Sesan</td>
                  </tr>
                  <tr>
                      <td>5</td>
                      <td>June 30</td>
                      <td>9-11 am</td>
                      <td>Citation and referencing</td>
                      <td>Dr Alice McClure</td>
                  </tr>
                  <tr>
                      <td>6</td>
                      <td>July 7</td>
                      <td>9-11 am</td>
                      <td>Navigating the scientific publishing cycle</td>
                      <td>Dr Sylvia Croese</td>
                  </tr>
              </tbody>
          </table>

          <div className="key_dates">
              <h3>Other key dates</h3>
              <ul>
                  <li>June 23 – Announcement of essay topic</li>
                  <li>July 7 – End of online lectures</li>
                  <li>July 21 – Deadline for essay submission</li>
                  <li>August 4 – Notification of final scores to students by email</li>
              </ul>
          </div>
      </Container>
  )
}

export default Schedule

const Container = styled.div`
    table {
        border-collapse: collapse;
        width: 100%;
        margin: 20px 0px;

        thead {
            tr{
                background: #213F7DAA;
                color: #FFFFFF;
            }
            th {
                font-weight: 700;
                padding: 5px;
                white-space: nowrap;
            }
        }
        tr {
            &:nth-child(even) {
                background: #213F7D3A;
            }
        }
        td {
            border: 1px solid #213F7D;
            padding: 10px;

            a {
                color: #213F7D;
            }
        }
    }
`