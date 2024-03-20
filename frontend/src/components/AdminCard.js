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
    background: `linear-gradient(to right, rgba(150, 200, 150, 0.8), rgba(100, 150, 100, 0.5)), url(https://images.pexels.com/photos/4342352/pexels-photo-4342352.jpeg?auto=compress&cs=tinysrgb&w=600)`,
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
  'Timely Reminders To Your Customers About When Rent Is Due',
  'Room Management: Use Our Custom Room Numbers To Name Your Rooms, We Will Help Keep Track Of Room Residence, Updating It In Real Time.',
  'Hostel Management: Your NO. 1 Friend Here. You Can Change All Your Hostel Information From There Once You Are Done With Your Hostel Set-Up Process.',
  'The System Automatically Cancels Unpaid Accommodations Exactly A Day After They Are Made By Customers',
  'The Systems Also Automatically Cancels Accommodations When The Date Is Due And Notifies Users To Move Out',
  'If For Some Reason You Want To Cancel Someones Accomodation You Can Do So As Well',
  'Please Note: Use Our Room Numbering System For Maximum Efficiency',
  'Track Your Payments Under Payments Tab, But Check Your Stripe Account For Detailed Information',
  'You Can Easily Add And Remove Staff Members To Help You In Day-To-Day Hostel Management.',
];

const AdminCard = () => {
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
                <FaCheckCircle className={classes.icon} />
                {feature}
              </Typography>
              {index < features.length - 1 && <Divider />}
            </div>
          ))}
          <Typography variant="caption" className={classes.note}>
            Please Note: Use Our Room Numbering system For Maximum efficiency
          </Typography>
          <Typography variant="body2" className={classes.contact}>
            Any More Questions? Chat To Us At: mrptjobs@gmail.com
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminCard;
