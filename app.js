import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import OurFacilities from './components/OurFacilities';
import SchoolOverview from './components/SchoolOverview';
import ContactInformation from './components/ContactInformation';
import StudentPortal from './components/StudentPortal';
import StaffPortal from './components/StaffPortal';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ContentUploadForm from './components/ContentUploadForm'; 
import AssignmentForm from './components/AssignmentForm'; 
import AssignmentList from './components/AssignmentList'; 
import AssignmentDetail from './components/AssignmentDetail'; 
import ResultsEditor from './components/ResultsEditor'; 
import ResultsSubmission from './components/ResultsSubmission'; 
import ResultsApproval from './components/ResultsApproval'; 
import StudentResults from './components/StudentResults'; 
import EducationalGames from './components/EducationalGames'; 
import AdminResultsCalculation from './components/AdminResultsCalculation';
import Chess from './components/games/Chess';
import Crossword from './components/games/Crossword';
import Puzzle from './components/games/Puzzle';
import Scrambled from './components/games/Scrambled';
import Sudoku from './components/games/Sudoku';
import Wordle from './components/games/Wordle';

const App = () => {
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = '/sign-in';
      }
    });
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HeroSection />
          <AboutSection />
          <OurFacilities />
          <SchoolOverview />
          <ContactInformation />
        </Route>
        <Route path="/student-portal" component={StudentPortal} />
        <Route path="/staff-portal" component={StaffPortal} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/upload-content" component={ContentUploadForm} />
        <Route path="/create-assignment" component={AssignmentForm} />
        <Route path="/assignments" exact component={AssignmentList} />
        <Route path="/assignments/:assignmentId" component={AssignmentDetail} />
        <Route path="/edit-results" component={ResultsEditor} />
        <Route path="/submit-results" component={ResultsSubmission} />
        <Route path="/approve-results" component={ResultsApproval} />
        <Route path="/view-results" component={StudentResults} />
        <Route path="/games" exact component={EducationalGames} />
        <Route path="/games/chess" component={Chess} />
        <Route path="/games/crossword" component={Crossword} />
        <Route path="/games/puzzle" component={Puzzle} />
        <Route path="/games/sudoku" component={Sudoku} />
        <Route path="/games/wordle" component={Wordle} />
        <Route path="/games/scrambled" component={Scrambled} />
        <Route path="/admin-results-calculation" component={AdminResultsCalculation} />
        <Redirect to="/sign-in" />
      </Switch>
    </Router>
  );
};

export default App;

