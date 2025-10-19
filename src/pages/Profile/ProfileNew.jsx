import React, { useEffect, useState } from "react";
import {
  Mail,
  MapPin,
  Award,
  TrendingUp,
  Wallet,
  Copy,
  Check,
  Loader,
  AlertCircle,
} from "lucide-react";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Profile.module.css";
import { useUser } from "../../contexts/UserContext";
import { supabase } from "../../config/supabaseConfig";

const TOKEN_SCALING = {
  1: 10,
  2: 50,
  3: 70,
  4: 100,
  5: 150,
  6: 200,
};

const ProfileNew = () => {
  const { user, updateUser, isLoading: userLoading } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    wallet_address: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [claimingTokens, setClaimingTokens] = useState(false);
  const [message, setMessage] = useState(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || "",
        username: user.username || "",
        wallet_address: user.wallet_address || "",
      });
      loadCompletedCourses();
    }
  }, [user?.id]);

  const loadCompletedCourses = async () => {
    if (!user?.id) return;
    setIsLoadingCourses(true);
    try {
      const { data, error } = await supabase
        .from("completions")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error loading completions:", error);
      } else {
        setCompletedCourses(data || []);
      }
    } catch (error) {
      console.error("Error loading completed courses:", error);
    } finally {
      setIsLoadingCourses(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const result = await updateUser({
        full_name: formData.full_name,
        username: formData.username,
        wallet_address: formData.wallet_address,
      });

      if (result.success) {
        setMessage({
          type: "success",
          text: "Profile updated successfully!",
        });
        setEditMode(false);
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to update profile",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Error updating profile",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleClaimTokens = async () => {
    if (!user?.wallet_address) {
      setMessage({
        type: "error",
        text: "Please connect your wallet first",
      });
      return;
    }

    setClaimingTokens(true);
    try {
      const tokensToCliam = TOKEN_SCALING[user.current_level] || 10;

      // Record token claim
      const { error } = await supabase.from("token_claims").insert([
        {
          user_id: user.id,
          level: user.current_level,
          tokens_claimed: tokensToCliam,
          status: "pending",
        },
      ]);

      if (error) {
        setMessage({
          type: "error",
          text: error.message || "Failed to claim tokens",
        });
      } else {
        setMessage({
          type: "success",
          text: `🎉 Claim submitted! You'll receive ${tokensToCliam} tokens. Blockchain integration coming soon.`,
        });
        setTimeout(() => setMessage(null), 5000);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Error claiming tokens",
      });
    } finally {
      setClaimingTokens(false);
    }
  };

  const copyWalletAddress = () => {
    if (user?.wallet_address) {
      navigator.clipboard.writeText(user.wallet_address);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  if (userLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader className={styles.spinner} />
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.notAuthenticatedContainer}>
        <Card className={styles.notAuthCard}>
          <h2>Please log in to view your profile</h2>
          <Button href="/login">Go to Login</Button>
        </Card>
      </div>
    );
  }

  const claimableTokens = TOKEN_SCALING[user.current_level] || 10;

  return (
    <div className={styles.profilePage}>
      <div className={styles.header}>
        <h1>Profile</h1>
      </div>

      {message && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.type === "success" ? <Check size={20} /> : <AlertCircle size={20} />}
          <p>{message.text}</p>
        </div>
      )}

      <div className={styles.container}>
        {/* Profile Information */}
        <Card className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <h2>Personal Information</h2>
            {!editMode && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setEditMode(true)}
              >
                Edit
              </Button>
            )}
          </div>

          {editMode ? (
            <div className={styles.editForm}>
              <div className={styles.formGroup}>
                <Input
                  label="Full Name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <Input
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled
                />
              </div>

              <div className={styles.formGroup}>
                <Input
                  label="Email"
                  value={user.email}
                  disabled
                />
              </div>

              <div className={styles.formGroup}>
                <Input
                  label="Wallet Address"
                  name="wallet_address"
                  value={formData.wallet_address}
                  onChange={handleInputChange}
                  placeholder="0x... (optional)"
                />
              </div>

              <div className={styles.editActions}>
                <Button
                  variant="primary"
                  onClick={handleSaveProfile}
                  loading={isSaving}
                >
                  Save Changes
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className={styles.profileInfo}>
              <div className={styles.infoItem}>
                <label>Full Name</label>
                <p>{user.full_name}</p>
              </div>

              <div className={styles.infoItem}>
                <label>Username</label>
                <p>@{user.username}</p>
              </div>

              <div className={styles.infoItem}>
                <Mail size={18} />
                <label>Email</label>
                <p>{user.email}</p>
              </div>

              {user.wallet_address && (
                <div className={styles.infoItem}>
                  <Wallet size={18} />
                  <label>Connected Wallet</label>
                  <div className={styles.walletAddress}>
                    <code>{user.wallet_address}</code>
                    <button
                      onClick={copyWalletAddress}
                      className={styles.copyButton}
                      title="Copy wallet address"
                    >
                      {copiedAddress ? (
                        <Check size={16} />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Stats */}
        <Card className={styles.statsCard}>
          <h2>Learning Statistics</h2>
          <div className={styles.statsList}>
            <div className={styles.statItem}>
              <Award size={24} />
              <div className={styles.statContent}>
                <p className={styles.statLabel}>Current Level</p>
                <p className={styles.statValue}>{user.current_level}</p>
              </div>
            </div>

            <div className={styles.statItem}>
              <TrendingUp size={24} />
              <div className={styles.statContent}>
                <p className={styles.statLabel}>Total Points</p>
                <p className={styles.statValue}>
                  {user.total_points?.toLocaleString()}
                </p>
              </div>
            </div>

            <div className={styles.statItem}>
              <Award size={24} />
              <div className={styles.statContent}>
                <p className={styles.statLabel}>Certificates Earned</p>
                <p className={styles.statValue}>{completedCourses.length}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Token Claiming */}
        <Card className={styles.tokenCard}>
          <div className={styles.tokenHeader}>
            <h2>Claim Platform Tokens</h2>
            <span className={styles.newBadge}>New</span>
          </div>

          <div className={styles.tokenInfo}>
            <p>Earn platform tokens when you level up!</p>
            <div className={styles.tokenReward}>
              <p>Level {user.current_level}</p>
              <p className={styles.tokenAmount}>{claimableTokens} Tokens</p>
            </div>

            {!user.wallet_address ? (
              <div className={styles.walletWarning}>
                <AlertCircle size={20} />
                <p>Connect your wallet to claim tokens</p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setEditMode(true)}
                >
                  Connect Wallet
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={handleClaimTokens}
                loading={claimingTokens}
                disabled={claimingTokens}
                className={styles.claimButton}
              >
                Claim {claimableTokens} Tokens
              </Button>
            )}

            <div className={styles.tokenScaling}>
              <h4>Token Scaling</h4>
              <ul>
                {Object.entries(TOKEN_SCALING).map(([level, tokens]) => (
                  <li key={level}>
                    <span>Level {level}</span>
                    <span className={styles.tokens}>{tokens} tokens</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Completed Courses */}
        {completedCourses.length > 0 && (
          <Card className={styles.certificatesCard}>
            <h2>Certificates</h2>
            {isLoadingCourses ? (
              <p>Loading certificates...</p>
            ) : (
              <div className={styles.certificatesList}>
                {completedCourses.map((cert) => (
                  <div key={cert.id} className={styles.certificateItem}>
                    <Award size={24} />
                    <div className={styles.certContent}>
                      <p>{cert.course_id}</p>
                      <small>
                        Completed on{" "}
                        {new Date(cert.completed_at).toLocaleDateString()}
                      </small>
                    </div>
                    <Button variant="secondary" size="sm" disabled>
                      Mint NFT (Coming Soon)
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProfileNew;
