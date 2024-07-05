import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, collection, query, getDocs } from 'firebase/firestore';
import moment from 'moment';

const DAILY_LIMIT = 60; // Daily limit in minutes

// Function to check the daily time limit
export const checkTimeLimit = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();

  if (user) {
    const studentRef = doc(db, 'students', user.uid);
    const studentDoc = await getDoc(studentRef);
    const studentData = studentDoc.data();
    const today = moment().format('YYYY-MM-DD');

    if (studentData.dailyUsage && studentData.dailyUsage.date === today) {
      return studentData.dailyUsage.timeSpent < DAILY_LIMIT;
    } else {
      // Reset daily usage for the new day
      await updateDoc(studentRef, {
        dailyUsage: {
          date: today,
          timeSpent: 0,
        },
      });
      return true;
    }
  }
  return false;
};

// Function to update the time spent
export const updateTimeSpent = async (timeSpent) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();

  if (user) {
    const studentRef = doc(db, 'students', user.uid);
    const studentDoc = await getDoc(studentRef);
    const studentData = studentDoc.data();
    const today = moment().format('YYYY-MM-DD');

    if (studentData.dailyUsage && studentData.dailyUsage.date === today) {
      await updateDoc(studentRef, {
        dailyUsage: {
          date: today,
          timeSpent: studentData.dailyUsage.timeSpent + timeSpent,
        },
      });
    }
  }
};

// Function to calculate positions in a specific subject
export const calculateSubjectPositions = async (subject) => {
  const db = getFirestore();
  const studentsRef = collection(db, 'students');
  const q = query(studentsRef);
  const querySnapshot = await getDocs(q);

  const students = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.results && data.results[subject]) {
      students.push({ studentId: doc.id, ...data.results[subject] });
    }
  });

  students.sort((a, b) => b.score - a.score); // Sort by score in descending order

  for (let i = 0; i < students.length; i++) {
    const studentRef = doc(db, 'students', students[i].studentId);
    await updateDoc(studentRef, {
      [`results.${subject}.position`]: i + 1,
    });
  }
};

// Function to calculate overall percentage for each student
export const calculateOverallPercentage = async () => {
  const db = getFirestore();
  const studentsRef = collection(db, 'students');
  const q = query(studentsRef);
  const querySnapshot = await getDocs(q);

  for (const docSnap of querySnapshot.docs) {
    const data = docSnap.data();
    let totalScore = 0;
    let totalPossible = 0;
    for (const subject in data.results) {
      totalScore += data.results[subject].score;
      totalPossible += 100; // Assuming each subject is out of 100
    }
    const overallPercentage = (totalScore / totalPossible) * 100;
    const studentRef = doc(db, 'students', docSnap.id);
    await updateDoc(studentRef, {
      overallPercentage,
    });
  }
};

// Function to rank students based on overall performance
export const rankStudentsOverall = async () => {
  const db = getFirestore();
  const studentsRef = collection(db, 'students');
  const q = query(studentsRef);
  const querySnapshot = await getDocs(q);

  const students = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.overallPercentage !== undefined) {
      students.push({ studentId: doc.id, overallPercentage: data.overallPercentage });
    }
  });

  students.sort((a, b) => b.overallPercentage - a.overallPercentage); // Sort by overall percentage in descending order

  for (let i = 0; i < students.length; i++) {
    const studentRef = doc(db, 'students', students[i].studentId);
    await updateDoc(studentRef, {
      overallPosition: i + 1,
    });
  }
};

// Function to calculate results (to be triggered after all results are submitted)
export const calculateResults = async () => {
  const subjects = ['math', 'science', 'english']; // Add all the subjects here

  // Calculate subject positions
  for (const subject of subjects) {
    await calculateSubjectPositions(subject);
  }

  // Calculate overall percentage for each student
  await calculateOverallPercentage();

  // Rank students based on overall performance
  await rankStudentsOverall();
};

