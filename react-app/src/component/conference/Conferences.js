import React  from 'react';
import './Conferences.css';
import ConferenceOverview from './ConferenceOverview';
import {gql} from 'react-apollo';
import {waitForGraphql} from '../../apollo'; 
import {divideInRows} from '../../utils/index';

const Conferences = ({allConferencesQuery: {
  conferences
}}) => {
    return (
      <div className="container section">

        <div className="columns section">
          <div className="column is-8">
            <div className="title">Conferences</div>
          </div>
        </div>

          {
            divideInRows(conferences, conference =>
              <div className="column is-4" key={conference.id}>
                <ConferenceOverview conference={conference}/>
              </div>
            )
          }
      </div>
    );
};

Conferences.defaultProps = {
  data: {
    conferences: []
  }
};

const query = gql`
  query Tototo {
    conferences: allConferences {
      id, startDate, name, logo, _attendeesMeta {count}, city, country
    }
  }
`;


const config = {
  options : {
    fetchPolicy: 'cache-and-network'
  },
  name: 'allConferencesQuery'
};

const ConferencesData = waitForGraphql(query, config)(Conferences);

export default ConferencesData;
