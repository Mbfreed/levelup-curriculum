import React from "react";
import { useCourse } from "../../contexts/CourseContext";
import {
  Trophy,
  Zap,
  Coins,
  Gift,
  Star,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import CertificateCard from "../../components/CertificateCard/CertificateCard";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import styles from "./Rewards.module.css";

const Rewards = () => {
  const {
    userStats,
    getAvailableCertificates,
    claimCertificate,
    addExp,
    addCoins,
  } = useCourse();

  const availableCertificates = getAvailableCertificates();

  const handleClaimCertificate = (certificateId) => {
    const tokenId = claimCertificate(certificateId);
    if (!tokenId) {
      // Certificate not claimable - this will be handled by the notification system
      return;
    }
  };

  const handlePurchaseCoins = (amount) => {
    // Simulate coin purchase
    addCoins(amount, "purchase");
  };

  const handleEarnExp = () => {
    // Demo function to earn EXP
    addExp(50, "daily login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Rewards & Achievements</h1>
        <p>Claim your certificates and manage your rewards</p>
      </div>

      {/* Level Progress */}
      <Card className={styles.levelProgressCard}>
        <div className={styles.levelProgressHeader}>
          <div className={styles.levelInfo}>
            <div className={styles.levelIcon}>
              <Trophy size={32} />
            </div>
            <div className={styles.levelDetails}>
              <h2>Level {userStats.level}</h2>
              <p>{userStats.exp.toLocaleString()} EXP Points</p>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleEarnExp}
            icon={<Star size={16} />}
          >
            Daily Bonus
          </Button>
        </div>

        {/* LP = Learning Points */}
        <div className={styles.progressSection}>
          <ProgressBar
            progress={userStats.exp % 500}
            max={500}
            label={`Progress to Level ${userStats.level + 1}`}
            showLabel={true}
          />
        </div>

        <div className={styles.nextLevelRewards}>
          <h4>Next Level Rewards:</h4>
          <div className={styles.rewardsList}>
            <div className={styles.rewardItem}>
              <Coins size={16} />
              <span>50 EXP</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Available Certificates */}
      <div className={styles.certificatesSection}>
        <h2>Available Certificates</h2>
        <p>Complete courses to unlock NFT certificates</p>

        <div className={styles.certificatesGrid}>
          {availableCertificates.length > 0 ? (
            availableCertificates.map((certificate) => (
              <CertificateCard
                key={certificate.id}
                courseName={certificate.courseName}
                userName="John Doe"
                completionDate={new Date().toLocaleDateString()}
                certificateId={certificate.id}
                platformName="Level Up"
                level={
                  certificate.nftMetadata.attributes.find(
                    (attr) => attr.trait_type === "Skill Level"
                  )?.value || "Intermediate"
                }
                skillLevel={
                  certificate.nftMetadata.attributes.find(
                    (attr) => attr.trait_type === "Skill Level"
                  )?.value || "Intermediate"
                }
                onClick={() => {
                  handleClaimCertificate(certificate.id);
                }}
                isClaimed={false}
              />
            ))
          ) : (
            <div className={styles.noCertificates}>
              <Trophy size={48} />
              <h3>No certificates available</h3>
              <p>Complete more courses to unlock certificate rewards</p>
            </div>
          )}
        </div>
      </div>

      {/* Coin Purchase Options */}
      <div className={styles.coinPurchaseSection}>
        <h2>Purchase Platform Coins</h2>
        <p>Buy coins to unlock premium features and rewards</p>

        <div className={styles.coinPackages}>
          <Card className={styles.coinPackage}>
            <div className={styles.packageHeader}>
              <Coins size={24} />
              <h3>100 Coins</h3>
            </div>
            <div className={styles.packagePrice}>$2.99</div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handlePurchaseCoins(100)}
              className={styles.purchaseButton}
            >
              Purchase
            </Button>
          </Card>

          <Card className={styles.coinPackage}>
            <div className={styles.packageHeader}>
              <Coins size={24} />
              <h3>500 Coins</h3>
            </div>
            <div className={styles.packagePrice}>
              $9.99 <span className={styles.bonus}>(+100 bonus)</span>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handlePurchaseCoins(600)}
              className={styles.purchaseButton}
            >
              Purchase
            </Button>
          </Card>

          <Card className={styles.coinPackage}>
            <div className={styles.packageHeader}>
              <Coins size={24} />
              <h3>1000 Coins</h3>
            </div>
            <div className={styles.packagePrice}>
              $19.99 <span className={styles.bonus}>(+300 bonus)</span>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => handlePurchaseCoins(1300)}
              className={styles.purchaseButton}
            >
              Purchase
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
