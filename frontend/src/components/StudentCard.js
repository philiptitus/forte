import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    boxShadow: theme.shadows[3],
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
    background: `linear-gradient(to right, rgba(150, 200, 150, 0.8), rgba(100, 150, 100, 0.5)), url(https://images.pexels.com/photos/206585/pexels-photo-206585.jpeg?auto=compress&cs=tinysrgb&w=600)`,
    backgroundSize: 'cover',
  },
  content: {
    padding: theme.spacing(3),
  },
  title: {
    fontSize: theme.typography.h5.fontSize,
    fontWeight: 600,
    marginBottom: theme.spacing(2),
  },
  subTitle: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.main,
  },
  note: {
    fontStyle: 'italic',
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  contact: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.success.main,
  },
}));

const features = [
  'Hello There Student Are You New Here?',
  '1. You Can Easily Search For New Hostels To Book Accommodation From, From Reviews And Pictures You Will Be Able To Make an Informed Decision.',
  '2. You Will Be Duly Reminded Everytime Rent is Due under the Notifications and Email be sure to check from time to time.',
  '3. Safely Track your Payments under the Payments tab but for more detailed payment info check your Stripe account.',
  '4. Under Your Profile You Can Easily Make Maintenance Requests For Any Damaged Facilities Or Complaints for any complaint you may have.',
  '5. Be sure To Go Under Edit Profile And Fill out every Information There This Will help the Hostel Management to Help you out just in case of anything.',
  'Any More Questions? Chat To Us At: mrptjobs@gmail.com',
];

const StudentCard = () => {
  const classes = useStyles();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography variant="h5" component="h2" className={classes.title}>
            New Here? What Can The System Do:
          </Typography>
          {features.map((feature, index) => (
            <div key={index}>
              <Typography variant="subtitle1" className={classes.subTitle}>
                {index === 0 ? (
                  <span className={classes.icon}><FaCheckCircle /></span>
                ) : (
                  <span>&nbsp;</span>
                )}
                {feature}
              </Typography>
              {index < features.length - 1 && <Divider />}
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StudentCard;
