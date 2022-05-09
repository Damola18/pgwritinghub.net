import React from 'react'
import styled from 'styled-components'
import Footer from '../Layouts/Footer'
import HomeNav from '../Layouts/HomeNav'

const CFA = () => {
  return (
      <>
        <HomeNav />
        <HomeHeader>
            <div className="text">
            <h1>Call for Applications: Critical Thinking and Writing Skills for Postgraduate Students</h1>
            </div>
        </HomeHeader>
        <CFAContainer>
            <div className="body">
                <p><a href="https://forms.gle/xNWAdqk7CPqjjqbN7" target="_blank" rel="noopener noreferrer" className='link'>Apply now</a></p>
                <br />
                <h3>Course description</h3>
                <p>This is an online short course funded by the <a href="http://www.vref.se/" target="_blank" rel="noopener noreferrer">Volvo Research and Educational Foundations </a> 
                (VREF) under its <a href="http://www.vref.se/macprogramme.4.6f1da68b172331c3f17a54a.html" target="_blank" rel="noopener noreferrer">{"‘Mobility and Access in African Cities’"}</a> programme. 
                The course is aimed at helping postgraduate students based in African universities develop the critical thinking and writing skills they require to effectively analyse and communicate their research. 
                The course will last for ten weeks and will address six core themes, namely: <i>the elements of a scientific argument; critical thinking and writing; the use of theoretical frameworks; 
                thematic analysis; citation and referencing; and navigating the scientific publishing cycle. </i> 
                Participants will develop skills in these core areas through interactive exercises and individual 
                writing tasks spread throughout the duration of the course. The course is targeted primarily at 
                master’s and Ph.D. students at all levels in disciplines related to urban transport and mobility, 
                but students in other fields of urban planning and development are also encouraged to apply. By the 
                end of the course, participants will be equipped with a set of cognitive and practical tools that will prove indispensable to their academic 
                and professional growth. The course will be delivered in English.</p>

                <h3>Course objectives</h3>
                <p>At the end of the course, participants who have engaged fully with the process will have gained knowledge and experience in the following areas:</p>
                <ol>
                    <li>Identifying the elements of a sound scientific argument.</li>
                    <li>Applying critical thinking skills to articulate and address theoretical and empirical gaps in the literature.</li>
                    <li>Situating empirical data within theoretical frameworks in scientific research and writing.</li>
                    <li>Analysing and presenting empirical data thematically, while balancing academic convention with creativity.</li>
                    <li>Understanding how to avoid plagiarism using proper citation and referencing conventions, including the use of plagiarism checkers and reference management systems.</li>
                    <li>Navigating the scientific publishing cycle.</li>
                </ol>
                <h3>Course structure</h3>
                <p>The course will be delivered in six main sessions, corresponding to the six themes/objectives outlined above, over six consecutive weeks. An additional four weeks will be devoted to course work and grading, for a total of 10 weeks.</p>
                <h3>Course materials</h3>
                <p>Participants will have access to relevant learning resources, including lecture notes, lecture recordings and topical bibliographies.</p>
                <h3>Course conveners</h3>
                <p className="img">
                    <img src="https://i.postimg.cc/YqWyfW5X/Headshot-Temilade-Sesan.jpg" alt="Temilade Sesan" />
                    Temilade Sesan holds a Ph.D. in Sociology and Social Policy from the University of Nottingham, UK. Her research interrogates the social, political and cultural dimensions of sustainable development initiatives in the areas of energy, waste management, transportation and urban planning – particularly as they intersect with issues of gender and informality in the sub-Saharan African context. Temilade has received funding for her research from the African Research Universities Alliance, the International Network for Government Science Advice, the International Science Council, the Partnership for Economic Policy, the UK Economic and Social Research Council, the UK Engineering and Physical Sciences Research Council and the United States Agency for International Development. She has published extensively on pathways to co-creating inclusive urban development with marginalised groups in international peer-reviewed academic journals. She teaches postgraduate modules in qualitative research and writing and renewable energy policy at the Centre for Petroleum, Energy Economics and Law, University of Ibadan, Nigeria.
                </p>
            
                <p className="img">
                    <img src="https://i.postimg.cc/L40n7hVR/Peter-Elias-headshot.jpg" alt="Peter Elias" />
                    <div>
                        Peter Elias holds a Ph.D. in Geography from the University of Ibadan, Nigeria. He is a Senior Lecturer in the Department of Geography and Team Lead, Lagos Urban Studies Group (LUSG), University of Lagos. He is an Urban and Regional Planner and a Development Geographer. He uses his expertise in transdisciplinary research for Deprived Area Mapping at the City or Neighbourhood Level, Co-design and Co-production of Knowledge, Citizen Science Data, Stakeholders’ Engagement, and Urban Data Governance Framework. He is a Co-Chair of the CODATA-WDS TG on Data from Participatory Mapping for the SDGs and Knowledge Task Group. He is the West African Coordinator of the Citizen Science African Association (CitSAF). He coordinates the University of Lagos Key to the City YouthMappers. Peter is a recipient of the UKRI Development and Innovation for Development in Africa (DIDA); International Science Council LIRA 2030 Research Grant in 2018 and 2020; the NRF South Africa COVID-19 Africa Rapid Grant Fund (CARGF) Award in 2021, Global Change SysTem for Analysis, Research, and Training (START) in 2012, among others. He has over twelve years’ experience in teaching postgraduate students on theoretical foundations for scientific research and writing.
                    </div>
                </p>
            
                <h3>Application and eligibility criteria</h3>
                <p>Applications are now being accepted for the course, which will run weekly from June 2 to August 4. The deadline for application is May 9, 2022. Successful applicants will be notified by May 23. </p>
                <p>
                    Applicants must be currently enrolled in a master’s or Ph.D. programme at an African university. Priority will be given to scholars of urban transport and mobility, but students in related fields such as urban planning, geography and development can also apply. Women are especially encouraged to apply.  
                </p>
                <br />
                <p><a href="https://forms.gle/xNWAdqk7CPqjjqbN7" target="_blank" rel="noopener noreferrer" className='link'>Apply now</a></p>
            </div>
        </CFAContainer>  
        <Footer /> 
    </>
  )
}

export default CFA


const HomeHeader = styled.div`
  background-image: url('https://i.postimg.cc/52FpLYrx/image.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 400px;
  margin-top: 80px;

  .text {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
      color: #FFFFFF;
      text-align: center;
      font-size: 40px;
    }
  }
`


const CFAContainer = styled.div`
    background: #FFFFFF;
    padding: 60px 100px;

    @media (max-width: 768px) {
        padding: 50px;
    }

    .img {
        margin: 20px 0px;
        padding: 20px 0px;
        display: flex;
        align-items: center;
        border-top: 2px solid #ccc;
        border-bottom: 2px solid #ccc;

        img {
            width: 300px;
            margin: 10px;
            max-width: 90%;
            object-fit: contain;
        }

        @media (max-width: 995px) {
            flex-direction: column;
        }
    }
    li {
        font-size: 18px;
    }
    p {
        margin: 5px 0px;
        font-size: 18px;

        a { 
            display: inline;
        }
        
        .link {
            background: #2AAA89;
            color: #FFFFFF;
            text-decoration: none;
            display: block;
            margin: 20px 10px;
            padding: 10px;
            text-align: center;
            border-radius: 8px;
        }

        iframe {
            margin: 20px 0px;
        }
    }
    
    h3 {
        margin-top: 15px;
        font-size: 22px;
    }

`